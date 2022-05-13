import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AcceptMembershipRequestArgs } from './dto/accept-membership-request.args.dto';
import { AcceptMembershipRequestResult } from './dto/accept-membership-request-result.obj.dto';
import { CreateMembershipRequestArgs } from './dto/create-membership-request.args.dto';
import { DeleteMembershipRequestArgs } from './dto/delete-membership-request.args.dto';
import { PaginatedMembershipRequests } from './dto/paginated-membership-requests.obj.dto';
import { QueryMembershipRequestArgs } from './dto/query-membership-request.args.dto';
import { QueryMembershipRequestsArgs } from './dto/query-membership-requests.args.dto';
import { RejectMembershipRequestArgs } from './dto/reject-membership-request.args.dto';
import { MembershipRequest } from './entities/membership-request.entity';
import { MembershipRequestsService } from './membership-requests.service';

@Resolver(() => MembershipRequest)
export class MembershipRequestsResolver {
  constructor(private service: MembershipRequestsService) {}

  @Query(() => PaginatedMembershipRequests)
  async membershipRequests(
    @Args() args: QueryMembershipRequestsArgs,
  ): Promise<PaginatedMembershipRequests> {
    return this.service.queryMany(args);
  }

  @Query(() => MembershipRequest)
  async membershipRequest(
    @Args() args: QueryMembershipRequestArgs,
  ): Promise<MembershipRequest> {
    return this.service.queryOne(args);
  }

  @Mutation(() => MembershipRequest)
  async createMembershipRequest(
    @Args() args: CreateMembershipRequestArgs,
  ): Promise<MembershipRequest> {
    return this.service.createOne(args);
  }

  @Mutation(() => MembershipRequest)
  async rejectMembershipRequest(
    @Args() args: RejectMembershipRequestArgs,
  ): Promise<MembershipRequest> {
    return this.service.rejectOne(args);
  }

  @Mutation(() => AcceptMembershipRequestResult)
  async acceptMembershipRequest(
    @Args() args: AcceptMembershipRequestArgs,
  ): Promise<AcceptMembershipRequestResult> {
    return this.service.acceptOne(args);
  }

  @Mutation(() => MembershipRequest)
  async deleteMembershipRequest(
    @Args() args: DeleteMembershipRequestArgs,
  ): Promise<MembershipRequest> {
    return this.service.deleteOne(args);
  }
}
