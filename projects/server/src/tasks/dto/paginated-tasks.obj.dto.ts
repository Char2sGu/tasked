import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../common/dto/paginated.obj.dto';
import { Task } from '../entities/task.entity';

@ObjectType()
export class PaginatedTasks extends Paginated.for(() => Task) {}
