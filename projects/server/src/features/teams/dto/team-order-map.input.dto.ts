import { InputType } from '@nestjs/graphql';

import { OrderMap } from '../../../common/dto/order/order-map.input.dto';
import { Team } from '../entities/team.entity';

@InputType()
export class TeamOrderMap extends OrderMap.from(Team) {}
