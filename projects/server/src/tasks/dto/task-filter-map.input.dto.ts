import { InputType } from '@nestjs/graphql';

import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { Task } from '../entities/task.entity';

@InputType()
export class TaskFilterMap extends FilterMap.from(Task) {}
