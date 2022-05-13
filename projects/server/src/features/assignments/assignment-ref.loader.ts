import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { Repository } from '../../mikro/repository.class';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentRefLoader extends EntityRefLoader<Assignment> {
  @InjectRepository(Assignment) protected repo!: Repository<Assignment>;
}
