import { ArgsType, ID } from '@nestjs/graphql';

import { Field } from '../field.decorator';

/**
 * @deprecated Specify arguments manually instead
 */
@ArgsType()
export class WithId {
  @Field(() => ID)
  id!: number;
}
