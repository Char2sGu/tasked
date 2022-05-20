import { Type } from '@nestjs/common';
import { ArgsType } from '@nestjs/graphql';

import { Field } from '../field.decorator';

/**
 * @deprecated Specify arguments manually instead
 */
@ArgsType()
export class WithData<Data> {
  static for<Data>(type: () => Type<Data>): Type<WithData<Data>> {
    @ArgsType()
    class AnonWithData extends this<Data> {
      @Field(() => type(), { nested: true })
      override data!: never;
    }

    return AnonWithData;
  }

  data!: Data;
}
