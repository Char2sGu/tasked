import { AnyEntity } from '@mikro-orm/core';
import { OperatorMap } from '@mikro-orm/core/typings';
import { Type } from '@nestjs/common';
import { InputType, ReturnTypeFunc } from '@nestjs/graphql';

import { Field } from '../../field.decorator';
import {
  FILTERABLE,
  Filterable,
  FilterableFieldMap,
} from './filterable.decorator';

@InputType()
export class FilterMap {
  /**
   * Create a filter map input class based on fields of the entity marked as
   * {@link Filterable}.
   * @param entityType
   * @returns
   */
  static from(entityType: Type<AnyEntity>): Type<FilterMap> {
    class _FilterMap extends this {}

    const map: FilterableFieldMap = Reflect.getMetadata(FILTERABLE, entityType);
    map.forEach(
      <Field extends string>(fieldType: ReturnTypeFunc, field: Field) => {
        apply(field, fieldType);
        apply(`${field}__eq`, fieldType);
        apply(`${field}__ne`, fieldType);
        apply(`${field}__in`, () => [fieldType()]);
        apply(`${field}__nin`, () => [fieldType()]);
        apply(`${field}__gt`, fieldType);
        apply(`${field}__gte`, fieldType);
        apply(`${field}__lt`, fieldType);
        apply(`${field}__lte`, fieldType);
        apply(`${field}__like`, () => String);

        function apply(property: FieldFilter<Field>, type: ReturnTypeFunc) {
          Field(type, { nullable: true })(_FilterMap.prototype, property);
        }
      },
    );

    InputType()(_FilterMap);

    return _FilterMap;
  }

  /**
   * Convert an filter map into a legal MikroORM condition map.
   * @param filterMap
   * @returns
   */
  static resolve(filterMap: FilterMap) {
    return Object.fromEntries(
      Object.entries(filterMap).map(([filter, value]) => [
        filter.replace(/__\w+$/, ''),
        this.resolveField(filter, value),
      ]),
    );
  }

  static resolveField(
    filter: FieldFilter<string>,
    value: unknown,
  ): OperatorMap<unknown> {
    if (filter.endsWith('__eq')) return { $eq: value };
    else if (filter.endsWith('__ne')) return { $ne: value };
    else if (filter.endsWith('__in')) return { $in: value as unknown[] };
    else if (filter.endsWith('__nin')) return { $nin: value as unknown[] };
    else if (filter.endsWith('__gt')) return { $gt: value };
    else if (filter.endsWith('__gte')) return { $gte: value };
    else if (filter.endsWith('__lt')) return { $lt: value };
    else if (filter.endsWith('__lte')) return { $lte: value };
    else if (filter.endsWith('__like')) return { $like: value as string };
    else return { $eq: value };
  }

  [field: string]: unknown;
}

type FieldFilter<Field extends string> =
  | Field
  | `${Field}__eq`
  | `${Field}__ne`
  | `${Field}__in`
  | `${Field}__nin`
  | `${Field}__gt`
  | `${Field}__gte`
  | `${Field}__lt`
  | `${Field}__lte`
  | `${Field}__like`;

Filterable;
