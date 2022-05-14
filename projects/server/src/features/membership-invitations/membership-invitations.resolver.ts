import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaginationArgs } from '../../common/dto';
import { ReqUser } from '../../common/req-user.decorator';
import { User } from '../users/entities/user.entity';
import { MembershipInvitationCreationInput } from './dto/membership-invitation.inputs';
import { PaginatedMembershipInvitations } from './dto/membership-invitation.objects';
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

  @Query(() => PaginatedMembershipInvitations)
  async membershipInvitations(
    @ReqUser() user: User,
    @Args() pagination: PaginationArgs,
  ): Promise<PaginatedMembershipInvitations> {
    return this.service.queryMany(user, pagination);
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
