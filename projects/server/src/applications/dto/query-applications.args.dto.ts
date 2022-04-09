import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../common/dto/order/with-order.args';
import { WithPagination } from '../../common/dto/with-pagination.args.dto';
import { ApplicationFilterMap } from './application-filter-map.input.dto';
import { ApplicationOrderMap } from './application-order-map.input';

@ArgsType()
export class QueryApplicationsArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => ApplicationOrderMap),
    WithFilter.for(() => ApplicationFilterMap),
  ),
) {}
