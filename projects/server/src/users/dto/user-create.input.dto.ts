import { InputType } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';
import { patterns } from 'common';

import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Gender } from '../../users/entities/gender.enum';
import { IsUnique } from '../../validation/is-unique.decorator';
import { User } from '../entities/user.entity';

@InputType()
export class UserCreateInput {
  @Field(() => String)
  @IsUnique(() => User, 'username', [CommonFilter.Crud])
  @Matches(patterns.username)
  @Length(1, 15)
  username!: string;

  @Field(() => String, { nullable: true })
  @Matches(patterns.nickname)
  @Length(1, 15)
  nickname?: string;

  @Field(() => String)
  @Length(6, 20)
  password!: string;

  @Field(() => Gender, { nullable: true })
  gender: Gender = Gender.Unknown;
}
