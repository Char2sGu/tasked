import { InputType } from '@nestjs/graphql';

import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { MembershipRequest } from '../entities/membership-request.entity';

@InputType()
export class MembershipRequestFilterMap extends FilterMap.from(
  MembershipRequest,
) {}
