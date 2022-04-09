import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { WithFilter } from '../../common/dto/filter/with-filter.args.dto';
import { WithOrder } from '../../common/dto/order/with-order.args';
import { WithPagination } from '../../common/dto/with-pagination.args.dto';
import { Field } from '../../common/field.decorator';
import { RoomFilterMap } from './room-filter-map.input.dto';
import { RoomOrderMap } from './room-order-map.input.dto';

@ArgsType()
export class QueryRoomsArgs extends IntersectionType(
  WithPagination,
  IntersectionType(
    WithOrder.for(() => RoomOrderMap),
    WithFilter.for(() => RoomFilterMap),
  ),
) {
  @Field(() => Boolean, { nullable: true })
  joinedOnly?: boolean;
}
