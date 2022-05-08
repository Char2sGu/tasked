import { ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Team } from '../../teams/entities/team.entity';
import { IsPrimaryKey } from '../../validation/is-primary-key.decorator';

@InputType()
export class ApplicationCreateInput {
  @Field(() => ID)
  @IsPrimaryKey(() => Team, [CommonFilter.Crud])
  team!: number;

  @Field(() => String, { nullable: true })
  @MaxLength(20)
  message?: string;
}
