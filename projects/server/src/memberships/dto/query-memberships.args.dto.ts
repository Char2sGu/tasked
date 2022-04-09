import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../common/dto/order/with-order.args';
import { WithPagination } from '../../common/dto/with-pagination.args.dto';
import { MembershipFilterMap } from './membership-filter-map.input.dto';
import { MembershipOrderMap } from './membership-order-map.input.dto';

@ArgsType()
export class QueryMembershipsArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => MembershipOrderMap),
    WithFilter.for(() => MembershipFilterMap),
  ),
) {}
