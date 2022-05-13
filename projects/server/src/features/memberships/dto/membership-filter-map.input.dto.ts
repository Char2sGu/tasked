import { InputType } from '@nestjs/graphql';

import { FilterMap } from '../../../common/dto/filter/filter-map.input.dto';
import { Membership } from '../entities/membership.entity';

@InputType()
export class MembershipFilterMap extends FilterMap.from(Membership) {}
