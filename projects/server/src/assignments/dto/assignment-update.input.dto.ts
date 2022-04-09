import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';
import { AssignmentCreateInput } from './assignment-create.input.dto';

@InputType()
export class AssignmentUpdateInput extends PartialType(
  PickType(AssignmentCreateInput, ['isImportant'] as const),
) {
  @Field(() => Boolean, { nullable: true })
  isCompleted?: boolean;
}
