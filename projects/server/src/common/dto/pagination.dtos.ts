/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field()
  @Min(1)
  @Max(100)
  limit: number = 50;

  @Field({ nullable: true })
  @Min(1)
  @Max(2000)
  offset?: number;
}

@ObjectType()
export abstract class Page<Item> {
  @Field()
  total!: number;

  abstract items: Item[];
}
