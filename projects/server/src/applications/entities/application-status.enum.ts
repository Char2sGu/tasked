import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationStatus {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

registerEnumType(ApplicationStatus, { name: 'ApplicationStatus' });
