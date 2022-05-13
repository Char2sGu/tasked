import { ReturnTypeFunc } from '@nestjs/graphql';

export const Filterable =
  (type?: ReturnTypeFunc) =>
  ({ constructor: target }: object, field: string): void => {
    const map: FilterableFieldMap =
      Reflect.getOwnMetadata(FILTERABLE_FIELD_MAP, target) ??
      new Map(Reflect.getMetadata(FILTERABLE_FIELD_MAP, target));
    const typeFromMetadata = Reflect.getMetadata('design:type', target, field);
    map.set(field, type ?? (() => typeFromMetadata));
    Reflect.defineMetadata(FILTERABLE_FIELD_MAP, map, target);
  };

export const FILTERABLE_FIELD_MAP = Symbol('filterable');

export type FilterableFieldMap = Map<string, ReturnTypeFunc>;
