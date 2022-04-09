import { ID, InputType } from '@nestjs/graphql';

import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Membership } from '../../memberships/entities/membership.entity';
import { Task } from '../../tasks/entities/task.entity';
import { IsPrimaryKey } from '../../validation/is-primary-key.decorator';

@InputType()
export class AssignmentCreateInput {
  @Field(() => ID)
  @IsPrimaryKey(() => Membership, [CommonFilter.Crud])
  recipient!: number;

  @Field(() => ID)
  @IsPrimaryKey(() => Task, [CommonFilter.Crud])
  task!: number;

  @Field(() => Boolean, { nullable: true })
  isImportant?: boolean;
}
