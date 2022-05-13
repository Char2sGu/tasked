import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../../common/dto/order/order-map.input.dto';
import { MembershipRequest } from '../entities/membership-request.entity';

@InputType()
export class MembershipRequestOrderMap extends OrderMap.from(
  MembershipRequest,
) {}
