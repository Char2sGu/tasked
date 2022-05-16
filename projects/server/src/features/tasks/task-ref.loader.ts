import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { Task, TaskRepository } from './entities/task.entity';

@Injectable()
export class TaskRefLoader extends EntityRefLoader<Task> {
  protected repo!: TaskRepository;
}
