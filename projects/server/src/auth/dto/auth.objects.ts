import { ObjectType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResult {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}

@ObjectType()
export class RegisterResult extends LoginResult {}

/**@deprecated */
@ObjectType()
export class AuthResult extends LoginResult {}
