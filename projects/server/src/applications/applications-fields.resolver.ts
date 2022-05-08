import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Team } from '../teams/entities/team.entity';
import { TeamRefLoader } from '../teams/team-ref.loader';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private teamRefLoader: TeamRefLoader,
  ) {}

  @ResolveField()
  async owner(@Parent() entity: Application): Promise<User> {
    return this.userRefLoader.load(entity.owner);
  }

  @ResolveField()
  async team(@Parent() entity: Application): Promise<Team> {
    return this.teamRefLoader.load(entity.team);
  }
}
