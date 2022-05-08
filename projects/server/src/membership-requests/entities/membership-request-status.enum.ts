import { registerEnumType } from '@nestjs/graphql';

export enum MembershipRequestStatus {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

registerEnumType(MembershipRequestStatus, { name: 'MembershipRequestStatus' });
