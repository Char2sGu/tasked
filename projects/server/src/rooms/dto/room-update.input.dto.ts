import { ID, InputType, PartialType } from '@nestjs/graphql';

import { Field } from '../../common/field.decorator';
import { RoomCreateInput } from './room-create.input.dto';

@InputType()
export class RoomUpdateInput extends PartialType(RoomCreateInput) {
  @Field(() => ID, { nullable: true })
  creator?: number;

  @Field(() => Boolean, { nullable: true })
  isOpen?: boolean;
}
