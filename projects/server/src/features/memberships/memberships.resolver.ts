import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { QueryMembershipsArgs } from './dto/membership.args';
import { MembershipUpdateInput } from './dto/membership.inputs';
import { PaginatedMemberships } from './dto/memberships.objects';
import { Membership } from './entities/membership.entity';
import { MembershipsService } from './memberships.service';

@Resolver(() => Membership)
export class MembershipsResolver {
  constructor(private service: MembershipsService) {}

  @Query(() => PaginatedMemberships)
  async memberships(
    @Args() args: QueryMembershipsArgs,
  ): Promise<PaginatedMemberships> {
    return this.service.queryMany(args);
  }

  @Query(() => Membership)
  async membership(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Membership> {
    return this.service.queryOne(id);
  }

  @Mutation(() => Membership)
  async updateMembership(
    @Args('id', { type: () => ID }) id: number,
    @Args('data') data: MembershipUpdateInput,
  ): Promise<Membership> {
    return this.service.updateOne(id, data);
  }

  @Mutation(() => Membership)
  async deleteMembership(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Membership> {
    return this.service.deleteOne(id);
  }
}
