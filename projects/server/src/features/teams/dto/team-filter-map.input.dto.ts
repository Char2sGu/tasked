import { InputType } from '@nestjs/graphql';

import { FilterMap } from '../../../common/dto/filter/filter-map.input.dto';
import { Team } from '../entities/team.entity';

@InputType()
export class TeamFilterMap extends FilterMap.from(Team) {}
