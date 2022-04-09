import {
  Cascade,
  Collection,
  Entity,
  Filter,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

import { PaginatedAssignments } from '../../assignments/dto/paginated-assignments.obj.dto';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { BaseEntity } from '../../common/base-entity.entity';
import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Context } from '../../context/context.class';
import { Room } from '../../rooms/entities/room.entity';
import { PaginatedTasks } from '../../tasks/dto/paginated-tasks.obj.dto';
import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from './role.enum';

@ObjectType()
@Filter<Membership>({
  name: CommonFilter.Crud,
  cond: () => ({
    room: {
      memberships: { owner: Context.current.user, deletedAt: null },
    },
  }),
})
@Unique<Membership>({ properties: ['owner', 'room', 'deletedAt'] })
@Entity()
export class Membership extends BaseEntity<Membership> {
  @Field(() => User)
  @ManyToOne({
    entity: () => User,
  })
  owner!: User;

  @Field(() => Room)
  @ManyToOne({
    entity: () => Room,
  })
  room!: Room;

  @Field(() => PaginatedAssignments)
  @OneToMany({
    entity: () => Assignment,
    mappedBy: (assignment) => assignment.recipient,
    cascade: [Cascade.ALL],
  })
  assignments = new Collection<Assignment>(this);

  @Field(() => PaginatedTasks)
  @OneToMany({
    entity: () => Task,
    mappedBy: (task) => task.creator,
    cascade: [Cascade.ALL],
  })
  tasks = new Collection<Task>(this);

  @Field(() => Role, { orderable: true, filterable: true })
  @Property()
  role!: Role;
}
