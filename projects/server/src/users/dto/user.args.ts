import { ArgsType } from '@nestjs/graphql';
import { IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../common/dto/order/with-order.args';
import { WithData } from '../../common/dto/with-data.args.dto';
import { WithId } from '../../common/dto/with-id.args.dto';
import { WithPagination } from '../../common/dto/with-pagination.args.dto';
import {
  UserCreateInput,
  UserFilterMap,
  UserOrderMap,
  UserUpdateInput,
} from './user.inputs';

@ArgsType()
export class QueryUserArgs extends WithId {}

@ArgsType()
export class QueryUsersArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => UserOrderMap),
    WithFilter.for(() => UserFilterMap),
  ),
) {}

@ArgsType()
export class UpdateUserArgs extends IntersectionType(
  WithId,
  WithData.for(() => UserUpdateInput),
) {}

/**@deprecated */
@ArgsType()
export class CreateUserArgs extends WithData.for(() => UserCreateInput) {}
