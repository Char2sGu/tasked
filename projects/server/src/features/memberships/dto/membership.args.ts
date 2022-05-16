import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../../common/dto/pagination.dtos';
import { MembershipFilterMap, MembershipOrderMap } from './membership.inputs';

@ArgsType()
export class QueryMembershipsArgs extends PaginationArgs {
  @Field({ nullable: true })
  filter?: MembershipFilterMap;

  @Field({ nullable: true })
  order?: MembershipOrderMap;
}
