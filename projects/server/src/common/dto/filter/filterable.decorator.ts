import { ReturnTypeFunc } from '@nestjs/graphql';

export const Filterable =
  (type?: ReturnTypeFunc) =>
  ({ constructor: target }: object, field: string): void => {
    // TODO: get type from TypeGraphQL metadata storage
    const map: FilterableFieldMap =
      Reflect.getOwnMetadata(FILTERABLE_FIELD_MAP, target) ??
      new Map(Reflect.getMetadata(FILTERABLE_FIELD_MAP, target));
    const typeFromReflection = Reflect.getMetadata(
      'design:type',
      target.prototype,
      field,
    );
    map.set(field, type ?? (() => typeFromReflection));
    Reflect.defineMetadata(FILTERABLE_FIELD_MAP, map, target);
  };

export const FILTERABLE_FIELD_MAP = Symbol('filterable');

export type FilterableFieldMap = Map<string, ReturnTypeFunc>;
