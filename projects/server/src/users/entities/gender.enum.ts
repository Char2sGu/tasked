import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  Male = 'M',
  Female = 'F',
  Unknown = 'X',
}

registerEnumType(Gender, { name: 'Gender' });
