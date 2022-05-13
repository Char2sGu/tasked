import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { EntityRefLoader } from '../../common/entity-ref-loader.class';
import { Repository } from '../../mikro/repository.class';
import { MembershipRequest } from './entities/membership-request.entity';

@Injectable()
export class MembershipRequestRefLoader extends EntityRefLoader<MembershipRequest> {
  @InjectRepository(MembershipRequest)
  protected repo!: Repository<MembershipRequest>;
}
