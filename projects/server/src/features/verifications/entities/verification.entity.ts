import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../../common/base-entity.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Verification extends BaseEntity<Verification> {
  @ManyToOne(() => User)
  user!: User;

  @Property()
  code!: string;

  @Field()
  @Property()
  verified!: boolean;

  @Field()
  @Property()
  remainingAttemptCount!: number;

  @Field()
  @Property()
  expiresAt!: Date;
}
