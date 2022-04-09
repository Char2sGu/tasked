import { ObjectType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';
import { Membership } from '../../memberships/entities/membership.entity';
import { Application } from '../entities/application.entity';

@ObjectType()
export class AcceptApplicationResult {
  @Field(() => Application)
  application!: Application;

  @Field(() => Membership)
  membership!: Membership;
}
