import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../common/dto/order/with-order.args';
import { WithPagination } from '../../common/dto/with-pagination.args.dto';
import { UserFilterMap } from './user-filter-map.input.dto';
import { UserOrderMap } from './user-order-map.input.dto';

@ArgsType()
export class QueryUsersArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => UserOrderMap),
    WithFilter.for(() => UserFilterMap),
  ),
) {}
