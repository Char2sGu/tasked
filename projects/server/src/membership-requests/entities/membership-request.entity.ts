import { Entity, Filter, ManyToOne, Property } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base-entity.entity';
import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Context } from '../../context/context.class';
import { Team } from '../../teams/entities/team.entity';
import { User } from '../../users/entities/user.entity';
import { MembershipRequestStatus } from './membership-request-status.enum';

@ObjectType()
@Filter<MembershipRequest>({
  name: CommonFilter.Crud,
  cond: () => ({
    $or: [
      { owner: Context.current.user },
      { team: { creator: Context.current.user } },
    ],
  }),
})
@Entity()
export class MembershipRequest extends BaseEntity<MembershipRequest> {
  @Field(() => User)
  @ManyToOne({
    entity: () => User,
  })
  owner!: User;

  @Field(() => Team)
  @ManyToOne({
    entity: () => Team,
  })
  team!: Team;

  @Field(() => String, { nullable: true, orderable: true, filterable: true })
  @Property({ nullable: true })
  message?: string;

  @Field(() => MembershipRequestStatus, { orderable: true, filterable: true })
  @Property()
  status!: MembershipRequestStatus;
}
