import { EntityField } from '@mikro-orm/core/';
import { Type } from '@nestjs/common';
import {
  ResolveField as ResolveFieldBase,
  ResolveFieldOptions,
  ReturnTypeFunc,
} from '@nestjs/graphql';

/**
 * Provide better type support.
 *
 * @deprecated
 *
 * @param entityType
 * @param field
 * @param returnType
 * @param options
 * @returns
 */
export const ResolveField =
  <Entity, Field extends Extract<EntityField<Entity>, string>>(
    entityType: () => Type<Entity>,
    field: Field,
    returnType: ReturnTypeFunc,
    options?: ResolveFieldOptions,
  ) =>
  (
    prototype: object,
    propertyKey: `resolve${Capitalize<Field>}`,
    descriptor: PropertyDescriptor,
  ): void | PropertyDescriptor =>
    ResolveFieldBase(field, returnType, options)(
      prototype,
      propertyKey,
      descriptor,
    );
