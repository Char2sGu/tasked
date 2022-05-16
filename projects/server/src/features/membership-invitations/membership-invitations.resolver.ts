import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ReqUser } from '../../common/req-user.decorator';
import { User } from '../users/entities/user.entity';
import { QueryMembershipInvitationsArgs } from './dto/membership-invitation.args';
import { MembershipInvitationCreationInput } from './dto/membership-invitation.inputs';
import { MembershipInvitationPage } from './dto/membership-invitation.objects';
import { MembershipInvitation } from './entities/membership-invitation.entity';
import { MembershipInvitationsService } from './membership-invitations.service';

@Resolver()
export class MembershipInvitationsResolver {
  constructor(private service: MembershipInvitationsService) {}

  @Query(() => MembershipInvitation)
  async membershipInvitation(
    @ReqUser() user: User,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<MembershipInvitation> {
    return this.service.queryOne(user, id);
  }

  @Query(() => MembershipInvitationPage)
  async membershipInvitations(
    @ReqUser() user: User,
    @Args() args: QueryMembershipInvitationsArgs,
  ): Promise<MembershipInvitationPage> {
    return this.service.queryMany(user, args);
  }

  @Mutation(() => MembershipInvitation)
  async createMembershipInvitation(
    @ReqUser() user: User,
    @Args('data') data: MembershipInvitationCreationInput,
  ): Promise<MembershipInvitation> {
    return this.service.createOne(user, data);
  }

  @Mutation(() => MembershipInvitation)
  async acceptMembershipInvitation(
    @ReqUser() user: User,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<MembershipInvitation> {
    return this.service.acceptOne(user, id);
  }

  @Mutation(() => MembershipInvitation)
  async rejectMembershipInvitation(
    @ReqUser() user: User,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<MembershipInvitation> {
    return this.service.rejectOne(user, id);
  }

  @Mutation(() => MembershipInvitation)
  async revokeMembershipInvitation(
    @ReqUser() user: User,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<MembershipInvitation> {
    return this.service.revokeOne(user, id);
  }
}
