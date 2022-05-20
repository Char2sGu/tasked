import { Type } from '@nestjs/common';
import { ArgsType } from '@nestjs/graphql';

import { Field } from '../../field.decorator';

export class WithOrder<Order> {
  static for<Order>(type: () => Type<Order>): Type<WithOrder<Order>> {
    @ArgsType()
    class AnonWithOrder extends this<Order> {
      @Field(() => type(), { nullable: true, nested: true })
      override order!: never;
    }

    return AnonWithOrder;
  }

  order?: Order;
}
