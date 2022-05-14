import {
  Entity,
  Filter,
  FilterQuery,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity } from 'projects/server/src/common/base-entity.entity';
import { Repository } from 'projects/server/src/mikro/repository.class';

import { Membership } from '../../memberships/entities/membership.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity({ customRepository: () => MembershipInvitationRepository })
@Filter({
  name: 'accessibleBy',
  cond: ({ user }): FilterQuery<MembershipInvitation> => ({
    $or: [{ inviter: { owner: user } }, { target: user }],
  }),
})
export class MembershipInvitation extends BaseEntity<MembershipInvitation> {
  @Field(() => User)
  @ManyToOne(() => User)
  target!: User;

  @Field(() => Membership)
  @ManyToOne(() => Membership)
  inviter!: Membership;

  @Field()
  @Property()
  message?: string;

  @Field()
  @Property()
  status!: MembershipInvitationStatus;
}

export enum MembershipInvitationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Revoked = 'Revoked',
}
registerEnumType(MembershipInvitationStatus, {
  name: 'MembershipInvitationStatus',
});

export class MembershipInvitationRepository extends Repository<MembershipInvitation> {}
