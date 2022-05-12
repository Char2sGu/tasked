import { ArgsType } from '@nestjs/graphql';

import { WithData } from '../../common/dto/with-data.args.dto';
import { Field } from '../../common/field.decorator';
import { UserCreateInput } from '../../users/dto/user.inputs';

@ArgsType()
export class LoginArgs {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}

@ArgsType()
export class RegisterArgs extends WithData.for(() => UserCreateInput) {
  // TODO: implement captcha
}

/**@deprecated */
@ArgsType()
export class QueryTokenArgs extends LoginArgs {}
