import { Type } from '@nestjs/common';
import { Int, ObjectType } from '@nestjs/graphql';

import { Field } from '../field.decorator';

@ObjectType()
export class Paginated<Entity> {
  static for<Entity>(type: () => Type<Entity>): Type<Paginated<Entity>> {
    @ObjectType()
    class _Paginated extends this<Entity> {
      @Field(() => [type()])
      results!: never;
    }

    return _Paginated;
  }

  @Field(() => Int)
  total!: number;

  results!: Entity[];
}
