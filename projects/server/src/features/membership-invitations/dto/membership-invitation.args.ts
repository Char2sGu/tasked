import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from 'projects/server/src/common/dto/pagination.dtos';

import {
  MembershipInvitationFilterMap,
  MembershipInvitationOrderMap,
} from './membership-invitation.inputs';

@ArgsType()
export class QueryMembershipInvitationsArgs extends PaginationArgs {
  @Field({ nullable: true })
  filter?: MembershipInvitationFilterMap;

  @Field({ nullable: true })
  order?: MembershipInvitationOrderMap;
}
