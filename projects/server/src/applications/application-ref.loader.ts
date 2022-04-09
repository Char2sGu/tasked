import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../common/entity-ref-loader.class';
import { Repository } from '../mikro/repository.class';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationRefLoader extends EntityRefLoader<Application> {
  @InjectRepository(Application) protected repo!: Repository<Application>;
}
