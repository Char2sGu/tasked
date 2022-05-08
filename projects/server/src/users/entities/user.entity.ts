import {
  BeforeCreate,
  BeforeUpdate,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import dayjs from 'dayjs';

import { PaginatedApplications } from '../../applications/dto/paginated-applications.obj.dto';
import { Application } from '../../applications/entities/application.entity';
import { BaseEntity } from '../../common/base-entity.entity';
import { Field } from '../../common/field.decorator';
import { PaginatedMemberships } from '../../memberships/dto/paginated-memberships.obj.dto';
import { Membership } from '../../memberships/entities/membership.entity';
import { Quota } from '../../mikro/mikro-quota/quota.decorator';
import { PaginatedTeams } from '../../teams/dto/paginated-teams.obj.dto';
import { Team } from '../../teams/entities/team.entity';
import { Gender } from '../../users/entities/gender.enum';

@ObjectType()
@Unique<User>({ properties: ['username', 'deletedAt'] })
@Entity()
export class User extends BaseEntity<User> {
  @Field(() => String, { orderable: true, filterable: true })
  @Property()
  username!: string;

  @Field(() => String, { nullable: true, orderable: true, filterable: true })
  @Property({ nullable: true })
  nickname?: string;

  @Property()
  password!: string;

  @Field(() => Gender, { orderable: true, filterable: true })
  @Property()
  gender!: Gender;

  @Quota(20)
  @Field(() => PaginatedTeams)
  @OneToMany({
    entity: () => Team,
    mappedBy: (team) => team.creator,
    cascade: [Cascade.ALL],
  })
  teams = new Collection<Team>(this);

  @Field(() => PaginatedApplications)
  @OneToMany({
    entity: () => Application,
    mappedBy: (application) => application.owner,
    cascade: [Cascade.ALL],
  })
  applications = new Collection<Application>(this);

  @Field(() => PaginatedMemberships)
  @OneToMany({
    entity: () => Membership,
    mappedBy: (memberships) => memberships.owner,
    cascade: [Cascade.ALL],
  })
  memberships = new Collection<Membership>(this);

  isUpdatedRecently(): boolean {
    return dayjs(this.updatedAt).isAfter(dayjs().subtract(5, 'minute'));
  }

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const HASHED_LENGTH = 60;
    if (this.password.length == HASHED_LENGTH) return;
    this.password = await hash(this.password, 10);
  }
}
