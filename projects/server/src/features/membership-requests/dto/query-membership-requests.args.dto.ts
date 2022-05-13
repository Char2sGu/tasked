import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../../common/dto/order/with-order.args';
import { WithPagination } from '../../../common/dto/with-pagination.args.dto';
import { MembershipRequestFilterMap } from './membership-request-filter-map.input.dto';
import { MembershipRequestOrderMap } from './membership-request-order-map.input';

@ArgsType()
export class QueryMembershipRequestsArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => MembershipRequestOrderMap),
    WithFilter.for(() => MembershipRequestFilterMap),
  ),
) {}
