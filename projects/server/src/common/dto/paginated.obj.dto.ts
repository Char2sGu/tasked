import { Type } from '@nestjs/common';
import { Int, ObjectType } from '@nestjs/graphql';

import { RepositoryPaginationResult } from '../../mikro/repository.class';
import { Field } from '../field.decorator';
import { JsDocRequires } from '../jsdoc';
import { Page } from './pagination.dtos';

JsDocRequires(Page);

/**
 * @deprecated Use {@link Page} instead
 */
@ObjectType()
export class Paginated<Entity> implements RepositoryPaginationResult<Entity> {
  static for<Entity>(type: () => Type<Entity>): Type<Paginated<Entity>> {
    @ObjectType()
    class AnonPaginated extends this<Entity> {
      @Field(() => [type()])
      override results!: never;
    }

    return AnonPaginated;
  }

  @Field(() => Int)
  total!: number;

  results!: Entity[];
}
