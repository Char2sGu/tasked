import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../common/dto/order/order-map.input.dto';
import { Membership } from '../entities/membership.entity';

@InputType()
export class MembershipOrderMap extends OrderMap.from(Membership) {}
