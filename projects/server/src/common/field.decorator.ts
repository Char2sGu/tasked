import { applyDecorators, Type } from '@nestjs/common';
import {
  Field as FieldBase,
  FieldOptions as FieldOptionsBase,
  ReturnTypeFunc,
} from '@nestjs/graphql';
import { Expose, Type as TransformType } from 'class-transformer';
import { Allow, IsOptional, ValidateNested } from 'class-validator';

import { Filterable } from './dto/filter/filterable.decorator';
import { Orderable } from './dto/order/orderable.decorator';

/**
 * Combine decorators.
 * @deprecated Use separate decorators instead.
 * @param returnType
 * @param options
 * @returns
 */
export const Field = (
  returnType: ReturnTypeFunc,
  options?: FieldOptions,
): PropertyDecorator => {
  const decorators: PropertyDecorator[] = [];
  decorators.push(FieldBase(returnType, options));

  // class-validator
  decorators.push(Allow());
  if (options?.nullable) decorators.push(IsOptional());
  if (options?.nested) decorators.push(ValidateNested());

  // class-transformer
  decorators.push(Expose());
  if (options?.nested)
    decorators.push(
      TransformType(() => extractItemIfArray(returnType() as Type)),
    );

  // own
  if (options?.orderable) decorators.push(Orderable() as PropertyDecorator);
  if (options?.filterable)
    decorators.push(Filterable(returnType) as PropertyDecorator);

  return applyDecorators(...decorators);
};

function extractItemIfArray<T>(value: T | T[]) {
  return value instanceof Array ? value[0] : value;
}

interface FieldOptions extends FieldOptionsBase {
  nested?: boolean;
  orderable?: boolean;
  filterable?: boolean;
}
