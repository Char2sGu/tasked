import { Type } from '@nestjs/common';
import { ArgsType } from '@nestjs/graphql';

import { Field } from '../field.decorator';

@ArgsType()
export class WithData<Data> {
  static for<Data>(type: () => Type<Data>): Type<WithData<Data>> {
    @ArgsType()
    class _WithData extends this<Data> {
      @Field(() => type(), { nested: true })
      override data!: never;
    }

    return _WithData;
  }

  data!: Data;
}
