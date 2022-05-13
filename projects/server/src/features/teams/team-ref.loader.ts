import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { Repository } from '../../mikro/repository.class';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamRefLoader extends EntityRefLoader<Team> {
  @InjectRepository(Team) protected repo!: Repository<Team>;
}
