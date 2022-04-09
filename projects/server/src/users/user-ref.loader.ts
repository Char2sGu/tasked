import { InjectRepository } from '@mikro-orm/nestjs';

import { EntityRefLoader } from '../common/entity-ref-loader.class';
import { Repository } from '../mikro/repository.class';
import { User } from './entities/user.entity';

export class UserRefLoader extends EntityRefLoader<User> {
  @InjectRepository(User) protected repo!: Repository<User>;
}
