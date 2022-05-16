import {
  Cascade,
  Collection,
  Entity,
  Filter,
  FilterQuery,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonFilter } from 'projects/server/src/common/common-filter.enum';
import { Filterable } from 'projects/server/src/common/dto/filter/filterable.decorator';
import { Orderable } from 'projects/server/src/common/dto/order/orderable.decorator';
import { Context } from 'projects/server/src/context/context.class';
import { Repository } from 'projects/server/src/mikro/repository.class';

import { BaseEntity } from '../../../common/base-entity.entity';
import { PaginatedAssignments } from '../../assignments/dto/paginated-assignments.obj.dto';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { Role } from '../../memberships/entities/role.enum';
import { Team } from '../../teams/entities/team.entity';

@ObjectType()
@Entity({ customRepository: () => TaskRepository })
@Filter({
  name: CommonFilter.Crud,
  cond: (): FilterQuery<Task> => ({
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
export class Task extends BaseEntity<Task> {
  @Field(() => Membership)
  @ManyToOne(() => Membership)
  creator!: Membership;

  @Field(() => Team)
  @ManyToOne(() => Team)
  team!: Team;

  @Field()
  @Orderable()
  @Filterable()
  @Property()
  title!: string;

  @Field({ nullable: true })
  @Orderable()
  @Filterable()
  @Property({ nullable: true })
  description?: string;

  @Field()
  @Orderable()
  @Filterable()
  @Property()
  isActive!: boolean;

  @Field(() => PaginatedAssignments)
  @OneToMany(() => Assignment, 'task', { cascade: [Cascade.ALL] })
  assignments = new Collection<Assignment>(this);
}

export class TaskRepository extends Repository<Task> {}
