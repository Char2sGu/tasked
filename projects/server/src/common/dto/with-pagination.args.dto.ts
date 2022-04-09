import { ArgsType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

import { Field } from '../field.decorator';

@ArgsType()
export class WithPagination {
  @Field(() => Int)
  @Max(100)
  @Min(1)
  limit = 50;

  @Field(() => Int, { nullable: true })
  @Max(2000)
  @Min(1)
  offset?: number;
}
