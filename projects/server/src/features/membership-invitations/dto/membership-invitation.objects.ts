import { Field, ObjectType } from '@nestjs/graphql';
import { Page } from 'projects/server/src/common/dto/pagination.dtos';

import { MembershipInvitation } from '../entities/membership-invitation.entity';

@ObjectType()
export class MembershipInvitationPage extends Page<MembershipInvitation> {
  @Field(() => [MembershipInvitation])
  items!: MembershipInvitation[];
}
