import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

import { CommonFilter } from '../../../common/common-filter.enum';
import { IsPrimaryKey } from '../../../validation/is-primary-key.validator';
import { Team } from '../../teams/entities/team.entity';

@InputType()
export class TaskCreateInput {
  @Field()
  @Length(1, 30)
  title!: string;

  @Field({ nullable: true })
  @MaxLength(500)
  description?: string;

  @Field()
  endsAfter?: Date;

  @Field(() => ID)
  @IsPrimaryKey(() => Team, [CommonFilter.Crud])
  team!: number;
}

@InputType()
export class TaskUpdateInput extends PartialType(TaskCreateInput) {
  @Field(() => Boolean)
  isActive?: boolean;
}
