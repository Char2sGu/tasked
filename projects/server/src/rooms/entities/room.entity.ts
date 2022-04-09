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

import { Application } from '../../applications/entities/application.entity';
import { BaseEntity } from '../../common/base-entity.entity';
import { CommonFilter } from '../../common/common-filter.enum';
import { Field } from '../../common/field.decorator';
import { Context } from '../../context/context.class';
import { PaginatedMemberships } from '../../memberships/dto/paginated-memberships.obj.dto';
import { Membership } from '../../memberships/entities/membership.entity';
import { Quota } from '../../mikro/mikro-quota/quota.decorator';
import { User } from '../../users/entities/user.entity';

@Filter<Room>({
  name: CommonFilter.Crud,
  cond: () => ({
    $or: [
      { memberships: { owner: Context.current.user, deletedAt: null } },
      { isOpen: true },
    ],
  }),
})
@Entity()
@ObjectType()
export class Room extends BaseEntity<Room> {
  @Field(() => String, { orderable: true, filterable: true })
  @Property()
  name!: string;

  @Field(() => String, { nullable: true, orderable: true, filterable: true })
  @Property({ nullable: true })
  description?: string;

  @Field(() => Boolean, { orderable: true, filterable: true })
  @Property()
  isOpen!: boolean;

  @Field(() => User)
  @ManyToOne({
    entity: () => User,
  })
  creator!: User;

  @OneToMany({
    entity: () => Application,
    mappedBy: (application) => application.room,
    cascade: [Cascade.ALL],
  })
  applications = new Collection<Application>(this);

  @Quota(50)
  @Field(() => PaginatedMemberships)
  @OneToMany({
    entity: () => Membership,
    mappedBy: (membership) => membership.room,
    cascade: [Cascade.ALL],
  })
  memberships = new Collection<Membership>(this);
}
