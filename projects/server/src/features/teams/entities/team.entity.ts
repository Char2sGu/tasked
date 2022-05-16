import {
  Cascade,
  Collection,
  Entity,
  Filter,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../../common/base-entity.entity';
import { CommonFilter } from '../../../common/common-filter.enum';
import { Field } from '../../../common/field.decorator';
import { Context } from '../../../context/context.class';
import { Quota } from '../../../mikro/mikro-quota/quota.decorator';
import { MembershipRequest } from '../../membership-requests/entities/membership-request.entity';
import { PaginatedMemberships } from '../../memberships/dto/memberships.objects';
import { Membership } from '../../memberships/entities/membership.entity';
import { User } from '../../users/entities/user.entity';

@Filter<Team>({
  name: CommonFilter.Crud,
  cond: () => ({
    $or: [
      { memberships: { owner: Context.current.user, deletedAt: null } },
      { isOpen: true },
    ],
  }),
})
@Entity()
@ObjectType()
export class Team extends BaseEntity<Team> {
  @Field(() => String, { orderable: true, filterable: true })
  @Property()
  name!: string;

  @Field(() => String, { nullable: true, orderable: true, filterable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => Boolean, { orderable: true, filterable: true })
  @Property()
  isOpen!: boolean;

  @Field(() => User)
  @ManyToOne({
    entity: () => User,
  })
  creator!: User;

  @OneToMany({
    entity: () => MembershipRequest,
    mappedBy: (membershipRequest) => membershipRequest.team,
    cascade: [Cascade.ALL],
  })
  membershipRequests = new Collection<MembershipRequest>(this);

  @Quota(50)
  @Field(() => PaginatedMemberships)
  @OneToMany({
    entity: () => Membership,
    mappedBy: (membership) => membership.team,
    cascade: [Cascade.ALL],
  })
  memberships = new Collection<Membership>(this);
}
