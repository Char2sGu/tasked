import { ValidationArguments as BaseValidationArguments } from 'class-validator';

/**
 * A wrap of class-validator's base `ValidationArguments` which provides better
 * type supports for validation.
 */
export interface ValidationArguments<
  Constraints extends unknown[] = [],
  // eslint-disable-next-line @typescript-eslint/ban-types
  Obj extends object = object,
> extends BaseValidationArguments {
  object: Obj;
  constraints: Constraints;
}
