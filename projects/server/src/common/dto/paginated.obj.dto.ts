import { Type } from '@nestjs/common';
import { Int, ObjectType } from '@nestjs/graphql';

import { RepositoryPaginationResult } from '../../mikro/repository.class';
import { Field } from '../field.decorator';

// TODO: reconsider this

@ObjectType()
export class Paginated<Entity> implements RepositoryPaginationResult<Entity> {
  static for<Entity>(type: () => Type<Entity>): Type<Paginated<Entity>> {
    @ObjectType()
    class _Paginated extends this<Entity> {
      @Field(() => [type()])
      override results!: never;
    }

    return _Paginated;
  }

  @Field(() => Int)
  total!: number;

  results!: Entity[];
}
