import { InputType } from '@nestjs/graphql';

import { Field } from '../../../common/field.decorator';
import { Role } from '../entities/role.enum';

@InputType()
export class MembershipUpdateInput {
  @Field(() => Role, { nullable: true })
  role?: Role;
}
