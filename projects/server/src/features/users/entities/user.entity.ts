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
import { Field, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import { Filterable } from 'projects/server/src/common/dto/filter/filterable.decorator';
import { Orderable } from 'projects/server/src/common/dto/order/orderable.decorator';
import { Repository } from 'projects/server/src/mikro/repository.class';

import { BaseEntity } from '../../../common/base-entity.entity';
import { Quota } from '../../../mikro/mikro-quota/quota.decorator';
import { MembershipInvitationPage } from '../../membership-invitations/dto/membership-invitation.objects';
import { MembershipInvitation } from '../../membership-invitations/entities/membership-invitation.entity';
import { PaginatedMembershipRequests } from '../../membership-requests/dto/paginated-membership-requests.obj.dto';
import { MembershipRequest } from '../../membership-requests/entities/membership-request.entity';
import { PaginatedMemberships } from '../../memberships/dto/paginated-memberships.obj.dto';
import { Membership } from '../../memberships/entities/membership.entity';
import { PaginatedTeams } from '../../teams/dto/paginated-teams.obj.dto';
import { Team } from '../../teams/entities/team.entity';
import { Verification } from '../../verifications/entities/verification.entity';
import { Gender } from './gender.enum';

@ObjectType()
@Unique<User>({ properties: ['username', 'deletedAt'] })
@Entity({ customRepository: () => UserRepository })
export class User extends BaseEntity<User> {
  @Field()
  @Orderable()
  @Filterable()
  @Property()
  username!: string;

  @Field({ nullable: true })
  @Orderable()
  @Filterable()
  @Property({ nullable: true })
  nickname?: string;

  @Property()
  password!: string;

  @Field()
  @Orderable()
  @Filterable()
  @Property()
  email!: string;

  @Field(() => Gender)
  @Orderable()
  @Filterable(() => Gender)
  @Property()
  gender!: Gender;

  @Field(() => PaginatedTeams)
  @OneToMany(() => Team, 'creator', { cascade: [Cascade.ALL] })
  @Quota(20)
  teams = new Collection<Team>(this);

  @Field(() => PaginatedMembershipRequests)
  @OneToMany(() => MembershipRequest, 'owner', { cascade: [Cascade.ALL] })
  membershipRequests = new Collection<MembershipRequest>(this);

  @Field(() => PaginatedMemberships)
  @OneToMany(() => Membership, 'owner', { cascade: [Cascade.ALL] })
  memberships = new Collection<Membership>(this);

  @Field(() => MembershipInvitationPage)
  @OneToMany(() => MembershipInvitation, 'target', { cascade: [Cascade.ALL] })
  invitationsReceived = new Collection<MembershipInvitation>(this);

  @OneToMany(() => Verification, 'user', { cascade: [Cascade.ALL] })
  verifications = new Collection<Verification>(this);

  async isEmailVerified(): Promise<boolean> {
    const verifiedVerifications = await this.verifications.matching({
      where: { user: this, verified: true },
    });
    return !!verifiedVerifications.length;
  }

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const HASHED_LENGTH = 60;
    if (this.password.length === HASHED_LENGTH) return;
    this.password = await hash(this.password, 10);
  }
}

export class UserRepository extends Repository<User> {}
