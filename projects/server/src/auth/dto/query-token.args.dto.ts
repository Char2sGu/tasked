import { ArgsType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';

@ArgsType()
export class QueryTokenArgs {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}
