import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../common/dto/order/order-map.input.dto';
import { Task } from '../entities/task.entity';

@InputType()
export class TaskOrderMap extends OrderMap.from(Task) {}
