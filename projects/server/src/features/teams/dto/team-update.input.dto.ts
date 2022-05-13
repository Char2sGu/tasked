import { ID, InputType, PartialType } from '@nestjs/graphql';

import { Field } from '../../../common/field.decorator';
import { TeamCreateInput } from './team-create.input.dto';

@InputType()
export class TeamUpdateInput extends PartialType(TeamCreateInput) {
  @Field(() => ID, { nullable: true })
  creator?: number;

  @Field(() => Boolean, { nullable: true })
  isOpen?: boolean;
}
