import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../../common/base-entity.entity';
import { Field } from '../../../common/field.decorator';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Verification extends BaseEntity<Verification> {
  @ManyToOne({
    entity: () => User,
  })
  user!: User;

  @Property()
  code!: string;

  @Field(() => Boolean)
  @Property()
  verified!: boolean;

  @Field(() => Number)
  @Property()
  remainingAttemptCount!: number;

  @Field(() => Date)
  @Property()
  expiresAt!: Date;
}
