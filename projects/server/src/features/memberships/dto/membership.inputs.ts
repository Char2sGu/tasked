import { Field, InputType } from '@nestjs/graphql';
import { FilterMap } from 'projects/server/src/common/dto/filter/filter-map.input.dto';
import { OrderMap } from 'projects/server/src/common/dto/order/order-map.input.dto';

import { Membership } from '../entities/membership.entity';
import { Role } from '../entities/role.enum';

@InputType()
export class MembershipUpdateInput {
  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class MembershipFilterMap extends FilterMap.from(Membership) {}

@InputType()
export class MembershipOrderMap extends OrderMap.from(Membership) {}
