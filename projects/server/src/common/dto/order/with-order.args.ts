import { Type } from '@nestjs/common';
import { ArgsType } from '@nestjs/graphql';

import { Field } from '../../field.decorator';

export class WithOrder<Order> {
  static for<Order>(type: () => Type<Order>): Type<WithOrder<Order>> {
    @ArgsType()
    class _WithOrder extends this<Order> {
      @Field(() => type(), { nullable: true, nested: true })
      order!: never;
    }

    return _WithOrder;
  }

  order?: Order;
}
