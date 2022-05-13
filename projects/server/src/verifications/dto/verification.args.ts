import { ArgsType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';

@ArgsType()
export class RequestVerificationArgs {}

@ArgsType()
export class ConfirmVerificationArgs {
  @Field(() => String)
  code!: string;
}
