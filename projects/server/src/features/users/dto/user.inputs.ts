import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsEmail, Length, Matches } from 'class-validator';
import { patterns } from 'common';

import { CommonFilter } from '../../../common/common-filter.enum';
import { FilterMap } from '../../../common/dto/filter/filter-map.input.dto';
import { OrderMap } from '../../../common/dto/order/order-map.input.dto';
import { Field } from '../../../common/field.decorator';
import { IsUnique } from '../../../validation/is-unique.decorator';
import { Gender } from '../entities/gender.enum';
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
  @IsEmail()
  email!: string;

  @Field(() => String)
  @Length(6, 20)
  password!: string;

  @Field(() => Gender, { nullable: true })
  gender: Gender = Gender.Unknown;
}

@InputType()
export class UserUpdateInput extends PartialType(
  OmitType(UserCreateInput, ['username']),
) {}

@InputType()
export class UserFilterMap extends FilterMap.from(User) {}

@InputType()
export class UserOrderMap extends OrderMap.from(User) {}
