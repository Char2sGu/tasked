import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../common/dto/order/order-map.input.dto';
import { Application } from '../entities/application.entity';

@InputType()
export class ApplicationOrderMap extends OrderMap.from(Application) {}
