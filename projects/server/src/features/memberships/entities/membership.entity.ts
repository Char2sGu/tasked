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
import { Field, ObjectType } from '@nestjs/graphql';
import { Filterable } from 'projects/server/src/common/dto/filter/filterable.decorator';
import { Orderable } from 'projects/server/src/common/dto/order/orderable.decorator';
import { Repository } from 'projects/server/src/mikro/repository.class';

import { BaseEntity } from '../../../common/base-entity.entity';
import { CommonFilter } from '../../../common/common-filter.enum';
import { Context } from '../../../context/context.class';
import { PaginatedAssignments } from '../../assignments/dto/paginated-assignments.obj.dto';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { MembershipInvitationPage } from '../../membership-invitations/dto/membership-invitation.objects';
import { MembershipInvitation } from '../../membership-invitations/entities/membership-invitation.entity';
import { PaginatedTasks } from '../../tasks/dto/paginated-tasks.obj.dto';
import { Task } from '../../tasks/entities/task.entity';
import { Team } from '../../teams/entities/team.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from './role.enum';

@ObjectType()
@Filter<Membership>({
  name: CommonFilter.Crud,
  cond: () => ({
    team: {
      memberships: { owner: Context.current.user, deletedAt: null },
    },
  }),
})
@Unique<Membership>({ properties: ['owner', 'team', 'deletedAt'] })
@Entity({ customRepository: () => MembershipRepository })
export class Membership extends BaseEntity<Membership> {
  @Field()
  @ManyToOne()
  owner!: User;

  @Field()
  @ManyToOne()
  team!: Team;

  @Field({ nullable: true })
  @Orderable()
  @Filterable()
  @Property({ nullable: true })
  name?: string;

  @Field(() => PaginatedAssignments)
  @OneToMany(() => Assignment, 'recipient', { cascade: [Cascade.ALL] })
  assignments = new Collection<Assignment>(this);

  @Field(() => MembershipInvitationPage)
  @OneToMany(() => MembershipInvitation, 'inviter', { cascade: [Cascade.ALL] })
  invitationsSent = new Collection<MembershipInvitation>(this);

  @Field(() => PaginatedTasks)
  @OneToMany(() => Task, 'creator', { cascade: [Cascade.ALL] })
  tasks = new Collection<Task>(this);

  @Field(() => Role)
  @Orderable()
  @Filterable(() => Role)
  @Property()
  role!: Role;
}

export class MembershipRepository extends Repository<Membership> {}
