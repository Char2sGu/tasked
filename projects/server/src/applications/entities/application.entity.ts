import { Entity, Filter, ManyToOne, Property } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../common/base-entity.entity';
import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Context } from '../../context/context.class';
import { Team } from '../../teams/entities/team.entity';
import { User } from '../../users/entities/user.entity';
import { ApplicationStatus } from './application-status.enum';

@ObjectType()
@Filter<Application>({
  name: CommonFilter.Crud,
  cond: () => ({
    $or: [
      { owner: Context.current.user },
      { team: { creator: Context.current.user } },
    ],
  }),
})
@Entity()
export class Application extends BaseEntity<Application> {
  @Field(() => User)
  @ManyToOne({
    entity: () => User,
  })
  owner!: User;

  @Field(() => Team)
  @ManyToOne({
    entity: () => Team,
  })
  team!: Team;

  @Field(() => String, { nullable: true, orderable: true, filterable: true })
  @Property({ nullable: true })
  message?: string;

  @Field(() => ApplicationStatus, { orderable: true, filterable: true })
  @Property()
  status!: ApplicationStatus;
}
