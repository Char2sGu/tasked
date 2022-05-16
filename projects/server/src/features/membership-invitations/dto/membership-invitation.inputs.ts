import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { FilterMap } from 'projects/server/src/common/dto/filter/filter-map.input.dto';
import { OrderMap } from 'projects/server/src/common/dto/order/order-map.input.dto';

import { MembershipInvitation } from '../entities/membership-invitation.entity';

@InputType()
export class MembershipInvitationCreationInput {
  @Field(() => ID)
  targetId!: number;

  @Field(() => ID)
  teamId!: number;

  @Field()
  @Length(1, 200)
  message?: string;
}

@InputType()
export class MembershipInvitationFilterMap extends FilterMap.from(
  MembershipInvitation,
) {}

@InputType()
export class MembershipInvitationOrderMap extends OrderMap.from(
  MembershipInvitation,
) {}
