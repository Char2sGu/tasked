import { ObjectType } from '@nestjs/graphql';

import { Field } from '../../../common/field.decorator';
import { Membership } from '../../memberships/entities/membership.entity';
import { MembershipRequest } from '../entities/membership-request.entity';

@ObjectType()
export class AcceptMembershipRequestResult {
  @Field(() => MembershipRequest)
  membershipRequest!: MembershipRequest;

  @Field(() => Membership)
  membership!: Membership;
}
