import { ObjectType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResult {
  @Field(() => String)
  token!: string;

  @Field(() => User)
  user!: User;
}
