import { InputType, PartialType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';
import { TaskCreateInput } from './task-create.input.dto';

@InputType()
export class TaskUpdateInput extends PartialType(TaskCreateInput) {
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
