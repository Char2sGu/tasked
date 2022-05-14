import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class MembershipInvitationCreationInput {
  @Field(() => ID)
  targetId!: number;

  @Field(() => ID)
  teamId!: number;

  @Field()
  @Length(1, 200)
  message?: string;
}
