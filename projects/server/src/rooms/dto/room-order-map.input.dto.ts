import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../common/dto/order/order-map.input.dto';
import { Room } from '../entities/room.entity';

@InputType()
export class RoomOrderMap extends OrderMap.from(Room) {}
