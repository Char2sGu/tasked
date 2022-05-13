import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  Member = 'Member',
  Manager = 'Manager',
}

registerEnumType(Role, { name: 'Role' });
