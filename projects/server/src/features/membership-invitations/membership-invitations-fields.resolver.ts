import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Membership } from '../memberships/entities/membership.entity';
import { MembershipRefLoader } from '../memberships/membership-ref.loader';
import { User } from '../users/entities/user.entity';
import { UserRefLoader } from '../users/user-ref.loader';
import { MembershipInvitation } from './entities/membership-invitation.entity';

@Resolver(() => Membership)
export class MembershipInvitationsFieldsResolver {
  constructor(
    private userRefLoader: UserRefLoader,
    private membershipRefLoader: MembershipRefLoader,
  ) {}

  @ResolveField()
  async target(@Parent() parent: MembershipInvitation): Promise<User> {
    return this.userRefLoader.load(parent.target);
  }

  @ResolveField()
  async inviter(@Parent() parent: MembershipInvitation): Promise<Membership> {
    return this.membershipRefLoader.load(parent.inviter);
  }
}
