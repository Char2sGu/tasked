import { ArgsType, ID } from '@nestjs/graphql';

import { Field } from '../field.decorator';

@ArgsType()
export class WithId {
  @Field(() => ID)
  id!: number;
}
