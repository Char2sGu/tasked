import { FilterQuery } from '@mikro-orm/core';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { FilterMap } from '../../common/dto/filter/filter-map.input.dto';
import { MembershipRepository } from '../memberships/entities/membership.entity';
import { Role } from '../memberships/entities/role.enum';
import { User, UserRepository } from '../users/entities/user.entity';
import { QueryMembershipInvitationsArgs } from './dto/membership-invitation.args';
import { MembershipInvitationCreationInput } from './dto/membership-invitation.inputs';
import { MembershipInvitationPage } from './dto/membership-invitation.objects';
import {
  MembershipInvitation,
  MembershipInvitationRepository,
  MembershipInvitationStatus,
} from './entities/membership-invitation.entity';

@Injectable()
export class MembershipInvitationsService {
  constructor(
    private invitationRepo: MembershipInvitationRepository,
    private membershipRepo: MembershipRepository,
    private userRepo: UserRepository,
  ) {}

  async queryMany(
    user: User,
    { limit, offset, filter, order }: QueryMembershipInvitationsArgs,
    where: FilterQuery<MembershipInvitation> = {},
  ): Promise<MembershipInvitationPage> {
    return this.invitationRepo.findPage(
      { $and: [where, FilterMap.resolveOrEmpty<MembershipInvitation>(filter)] },
      { filters: { readableBy: { user } }, limit, offset, orderBy: order },
    );
  }

  async queryOne(user: User, id: number): Promise<MembershipInvitation> {
    return this.invitationRepo.findOneOrFail(
      { id },
      { filters: { readableBy: { user } } },
    );
  }

  async createOne(
    user: User,
    { targetId, teamId, message }: MembershipInvitationCreationInput,
  ): Promise<MembershipInvitation> {
    const membership = await this.membershipRepo.findOne({
      team: teamId,
      owner: user,
    });
    if (!membership) throw new ForbiddenException('Could not access this team');
    if (membership.role !== Role.Manager)
      throw new ForbiddenException('Insufficient permissions');

    const target = await this.userRepo.findOne(targetId);
    if (!target) throw new BadRequestException('Target not exists');

    const existing = await this.invitationRepo.findOne({
      inviter: membership,
      target,
      status: MembershipInvitationStatus.Pending,
    });
    if (existing) throw new BadRequestException('Invitation already exists');

    return this.invitationRepo.create({
      inviter: membership,
      target,
      message,
      status: MembershipInvitationStatus.Pending,
    });
  }

  async acceptOne(user: User, id: number): Promise<MembershipInvitation> {
    return this.settleOne(id, MembershipInvitationStatus.Accepted, user);
  }

  async rejectOne(user: User, id: number): Promise<MembershipInvitation> {
    return this.settleOne(id, MembershipInvitationStatus.Rejected, user);
  }

  async revokeOne(user: User, id: number): Promise<MembershipInvitation> {
    const invitation = await this.invitationRepo.findOne({
      id,
      inviter: { owner: user },
    });
    if (!invitation) throw new BadRequestException('Invitation not exists');
    this.ensureNotSettled(invitation);
    invitation.status = MembershipInvitationStatus.Revoked;
    return invitation;
  }

  private async settleOne(
    id: number,
    status: MembershipInvitationStatus,
    user: User,
  ): Promise<MembershipInvitation> {
    const invitation = await this.invitationRepo.findOne({ id, target: user });
    if (!invitation) throw new BadRequestException('Invitation not exists');
    this.ensureNotSettled(invitation);
    invitation.status = status;
    return invitation;
  }

  private ensureNotSettled(invitation: MembershipInvitation): void {
    if (invitation.status !== MembershipInvitationStatus.Pending)
      throw new ForbiddenException('Could not operate on settled invitation');
  }
}
