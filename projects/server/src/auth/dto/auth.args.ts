import { ArgsType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';

@ArgsType()
export class LoginArgs {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}

/**@deprecated */
@ArgsType()
export class QueryTokenArgs extends LoginArgs {}
