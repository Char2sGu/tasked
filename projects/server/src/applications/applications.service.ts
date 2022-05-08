import { FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { CommonFilter } from '../common/common-filter.enum';
import { FilterMap } from '../common/dto/filter/filter-map.input.dto';
import { Context } from '../context/context.class';
import { Membership } from '../memberships/entities/membership.entity';
import { Role } from '../memberships/entities/role.enum';
import { MikroQuotaService } from '../mikro/mikro-quota/mikro-quota.service';
import { Repository } from '../mikro/repository.class';
import { Team } from '../teams/entities/team.entity';
import { AcceptApplicationArgs } from './dto/accept-application.args.dto';
import { AcceptApplicationResult } from './dto/accept-application-result.obj.dto';
import { CreateApplicationArgs } from './dto/create-application.args.dto';
import { DeleteApplicationArgs } from './dto/delete-application.args.dto';
import { PaginatedApplications } from './dto/paginated-applications.obj.dto';
import { QueryApplicationArgs } from './dto/query-application.args.dto';
import { QueryApplicationsArgs } from './dto/query-applications.args.dto';
import { RejectApplicationArgs } from './dto/reject-application.args.dto';
import { Application } from './entities/application.entity';
import { ApplicationStatus } from './entities/application-status.enum';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private repo: Repository<Application>,

    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,

    @InjectRepository(Team)
    private teamRepo: Repository<Team>,

    private quota: MikroQuotaService,
  ) {}

  async queryMany(
    { limit, offset, order, filter }: QueryApplicationsArgs,
    query: FilterQuery<Application> = {},
  ): Promise<PaginatedApplications> {
    return this.repo.findAndPaginate(
      {
        $and: [query, filter ? FilterMap.resolve<Application>(filter) : {}],
      },
      {
        limit,
        offset,
        filters: [CommonFilter.Crud],
        orderBy: { ...order },
      },
    );
  }

  async queryOne({ id }: QueryApplicationArgs): Promise<Application> {
    return this.repo.findOneOrFail(id, { filters: [CommonFilter.Crud] });
  }

  async createOne({ data }: CreateApplicationArgs): Promise<Application> {
    const user = Context.current.user;

    await this.teamRepo
      .findOne(data.team, {
        populate: ['memberships'],
        filters: false,
      })
      .then((team) => this.quota.check(team!, 'memberships'));

    await this.teamRepo
      .findOne({
        id: data.team,
        $or: [
          {
            applications: {
              owner: user,
              status: ApplicationStatus.Pending,
              deletedAt: null,
            },
          },
          {
            memberships: {
              owner: user,
              deletedAt: null,
            },
          },
        ],
      })
      .then((result) => {
        if (result)
          throw new BadRequestException(
            'team must be an ID of a team in which you have no membership or application',
          );
      });

    return this.repo.create({
      owner: user,
      status: ApplicationStatus.Pending,
      ...data,
    });
  }

  async rejectOne({ id }: RejectApplicationArgs): Promise<Application> {
    const application = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    this.forbidResulted(application, 'reject');

    return application.assign({
      status: ApplicationStatus.Rejected,
    });
  }

  async acceptOne({
    id,
  }: AcceptApplicationArgs): Promise<AcceptApplicationResult> {
    const application = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    this.forbidResulted(application, 'accept');

    application.assign({
      status: ApplicationStatus.Accepted,
    });

    const membership = this.membershipRepo.create({
      owner: application.owner,
      team: application.team,
      role: Role.Member,
    });

    return { application, membership };
  }

  async deleteOne({ id }: DeleteApplicationArgs): Promise<Application> {
    const application = await this.repo.findOneOrFail(id, {
      filters: [CommonFilter.Crud],
    });

    this.forbidResulted(application, 'delete');

    return this.repo.delete(application);
  }

  private forbidResulted(application: Application, action: string) {
    if (application.status != ApplicationStatus.Pending)
      throw new ForbiddenException(`Cannot ${action} resulted applications`);
  }
}
