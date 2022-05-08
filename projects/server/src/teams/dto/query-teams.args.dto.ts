import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../common/dto/order/with-order.args';
import { WithPagination } from '../../common/dto/with-pagination.args.dto';
import { Field } from '../../common/field.decorator';
import { TeamFilterMap } from './team-filter-map.input.dto';
import { TeamOrderMap } from './team-order-map.input.dto';

@ArgsType()
export class QueryTeamsArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => TeamOrderMap),
    WithFilter.for(() => TeamFilterMap),
  ),
) {
  @Field(() => Boolean, { nullable: true })
  joinedOnly?: boolean;
}
