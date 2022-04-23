import { Type } from '@nestjs/common';
import { ArgsType } from '@nestjs/graphql';

import { Field } from '../../field.decorator';

@ArgsType()
export class WithFilter<Filter> {
  static for<Filter>(type: () => Type<Filter>): Type<WithFilter<Filter>> {
    @ArgsType()
    class _WithFilter extends this<Filter> {
      @Field(type, { nullable: true })
      override filter!: never;
    }

    return _WithFilter;
  }

  filter?: Filter;
}
