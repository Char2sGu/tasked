import { ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../../common/dto/paginated.obj.dto';
import { MembershipRequest } from '../entities/membership-request.entity';

@ObjectType()
export class PaginatedMembershipRequests extends Paginated.for(
  () => MembershipRequest,
) {}
