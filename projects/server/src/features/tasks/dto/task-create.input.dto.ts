import { ID, InputType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

import { CommonFilter } from '../../../common/common-filter.enum';
import { Field } from '../../../common/field.decorator';
import { IsPrimaryKey } from '../../../validation/is-primary-key.validator';
import { Team } from '../../teams/entities/team.entity';

@InputType()
export class TaskCreateInput {
  @Field(() => String)
  @Length(1, 30)
  title!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => ID)
  @IsPrimaryKey(() => Team, [CommonFilter.Crud])
  team!: number;
}
