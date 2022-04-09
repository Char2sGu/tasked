import { ID, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Room } from '../../rooms/entities/room.entity';
import { IsPrimaryKey } from '../../validation/is-primary-key.decorator';

@InputType()
export class ApplicationCreateInput {
  @Field(() => ID)
  @IsPrimaryKey(() => Room, [CommonFilter.Crud])
  room!: number;

  @Field(() => String, { nullable: true })
  @MaxLength(20)
  message?: string;
}
