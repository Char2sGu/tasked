import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../common/dto/order/order-map.input.dto';
import { User } from '../entities/user.entity';

@InputType()
export class UserOrderMap extends OrderMap.from(User) {}
