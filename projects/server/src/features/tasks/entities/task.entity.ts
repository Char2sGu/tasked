import {
  Cascade,
  Collection,
  Entity,
  Filter,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

import { BaseEntity } from '../../../common/base-entity.entity';
import { CommonFilter } from '../../../common/common-filter.enum';
import { Field } from '../../../common/field.decorator';
import { Context } from '../../../context/context.class';
import { PaginatedAssignments } from '../../assignments/dto/paginated-assignments.obj.dto';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { Role } from '../../memberships/entities/role.enum';
import { Team } from '../../teams/entities/team.entity';

@ObjectType()
@Filter<Task>({
  name: CommonFilter.Crud,
  cond: () => ({
    creator: { role: Role.Manager },
    $or: [
      { creator: { owner: Context.current.user } },
      {
        assignments: {
          recipient: { owner: Context.current.user },
          deletedAt: null,
        },
      },
    ],
  }),
})
@Entity()
export class Task extends BaseEntity<Task> {
  @Field(() => Membership)
  @ManyToOne({
    entity: () => Membership,
  })
  creator!: Membership;

  @Field(() => Team)
  @ManyToOne({
    entity: () => Team,
  })
  team!: Team;

  @Field(() => String, { orderable: true, filterable: true })
  @Property()
  title!: string;

  @Field(() => String, { nullable: true, orderable: true, filterable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => Boolean, { orderable: true, filterable: true })
  @Property()
  isActive!: boolean;

  @Field(() => PaginatedAssignments)
  @OneToMany({
    entity: () => Assignment,
    mappedBy: (assignment) => assignment.task,
    cascade: [Cascade.ALL],
  })
  assignments = new Collection<Assignment>(this);
}
