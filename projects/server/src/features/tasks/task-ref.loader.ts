import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { Repository } from '../../mikro/repository.class';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskRefLoader extends EntityRefLoader<Task> {
  @InjectRepository(Task) protected repo!: Repository<Task>;
}
