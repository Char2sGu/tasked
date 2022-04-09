import { InputType } from '@nestjs/graphql';

import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { User } from '../entities/user.entity';

@InputType()
export class UserFilterMap extends FilterMap.from(User) {}
