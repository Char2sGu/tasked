import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'projects/server/src/common/dto/paginated.obj.dto';

import { MembershipInvitation } from '../entities/membership-invitation.entity';

@ObjectType()
export class PaginatedMembershipInvitations extends Paginated.for(
  () => MembershipInvitation,
) {}
