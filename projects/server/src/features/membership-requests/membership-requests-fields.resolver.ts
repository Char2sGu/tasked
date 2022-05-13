import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Team } from '../teams/entities/team.entity';
import { TeamRefLoader } from '../teams/team-ref.loader';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { MembershipRequest } from './entities/membership-request.entity';

@Resolver(() => MembershipRequest)
export class MembershipRequestsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private teamRefLoader: TeamRefLoader,
  ) {}

  @ResolveField()
  async owner(@Parent() entity: MembershipRequest): Promise<User> {
    return this.userRefLoader.load(entity.owner);
  }

  @ResolveField()
  async team(@Parent() entity: MembershipRequest): Promise<Team> {
    return this.teamRefLoader.load(entity.team);
  }
}
