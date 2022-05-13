import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DeleteMembershipArgs } from './dto/delete-membership.args.dto';
import { PaginatedMemberships } from './dto/paginated-memberships.obj.dto';
import { QueryMembershipArgs } from './dto/query-membership.args.dto';
import { QueryMembershipsArgs } from './dto/query-memberships.args.dto';
import { UpdateMembershipArgs } from './dto/update-membership.args.dto';
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
  async membership(@Args() args: QueryMembershipArgs): Promise<Membership> {
    return this.service.queryOne(args);
  }

  @Mutation(() => Membership)
  async updateMembership(
    @Args() args: UpdateMembershipArgs,
  ): Promise<Membership> {
    return this.service.updateOne(args);
  }

  @Mutation(() => Membership)
  async deleteMembership(
    @Args() args: DeleteMembershipArgs,
  ): Promise<Membership> {
    return this.service.deleteOne(args);
  }
}
