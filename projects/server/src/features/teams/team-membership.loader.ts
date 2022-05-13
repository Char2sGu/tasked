import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { DataLoader } from '@nestjs-devkit/dataloader';

import { Context } from '../../context/context.class';
import { Repository } from '../../mikro/repository.class';
import { Membership } from '../memberships/entities/membership.entity';
import { Team } from './entities/team.entity';

/**
 * Load the user's own memberships in the teams.
 */
@Injectable()
export class TeamMembershipLoader extends DataLoader<
  Team,
  Membership | undefined
> {
  constructor(
    @InjectRepository(Membership)
    private membershipRepo: Repository<Membership>,
  ) {
    super();
  }

  protected async resolve(teams: Team[]): Promise<Membership[]> {
    const memberships = await this.membershipRepo.find({
      owner: Context.current.user,
      team: { $in: teams },
    });
    return teams.map(
      (team) => memberships.find((membership) => membership.team == team)!,
    );
  }
}
