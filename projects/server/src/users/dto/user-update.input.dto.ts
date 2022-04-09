import { InputType, OmitType, PartialType } from '@nestjs/graphql';

import { UserCreateInput } from './user-create.input.dto';

@InputType()
export class UserUpdateInput extends PartialType(
  OmitType(UserCreateInput, ['username']),
) {}
