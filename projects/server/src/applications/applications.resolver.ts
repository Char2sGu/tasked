import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ApplicationsService } from './applications.service';
import { AcceptApplicationArgs } from './dto/accept-application.args.dto';
import { AcceptApplicationResult } from './dto/accept-application-result.obj.dto';
import { CreateApplicationArgs } from './dto/create-application.args.dto';
import { DeleteApplicationArgs } from './dto/delete-application.args.dto';
import { PaginatedApplications } from './dto/paginated-applications.obj.dto';
import { QueryApplicationArgs } from './dto/query-application.args.dto';
import { QueryApplicationsArgs } from './dto/query-applications.args.dto';
import { RejectApplicationArgs } from './dto/reject-application.args.dto';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationsResolver {
  constructor(private service: ApplicationsService) {}

  @Query(() => PaginatedApplications)
  async applications(
    @Args() args: QueryApplicationsArgs,
  ): Promise<PaginatedApplications> {
    return this.service.queryMany(args);
  }

  @Query(() => Application)
  async application(@Args() args: QueryApplicationArgs): Promise<Application> {
    return this.service.queryOne(args);
  }

  @Mutation(() => Application)
  async createApplication(
    @Args() args: CreateApplicationArgs,
  ): Promise<Application> {
    return this.service.createOne(args);
  }

  @Mutation(() => Application)
  async rejectApplication(
    @Args() args: RejectApplicationArgs,
  ): Promise<Application> {
    return this.service.rejectOne(args);
  }

  @Mutation(() => AcceptApplicationResult)
  async acceptApplication(
    @Args() args: AcceptApplicationArgs,
  ): Promise<AcceptApplicationResult> {
    return this.service.acceptOne(args);
  }

  @Mutation(() => Application)
  async deleteApplication(
    @Args() args: DeleteApplicationArgs,
  ): Promise<Application> {
    return this.service.deleteOne(args);
  }
}
