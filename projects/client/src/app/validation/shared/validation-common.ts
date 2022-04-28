import { Directive, ElementRef, Provider, Type } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const provideValidator = (validator: Type<unknown>): Provider => ({
  provide: NG_VALIDATORS,
  useExisting: validator,
  multi: true,
});

/**
 * A special validator that is specific to a field and consists of multiple
 * other validators.
 */
@Directive()
export abstract class Validation implements Validator {
  abstract config: ValidationConfig;

  constructor(elementRef: ElementRef<HTMLInputElement>) {
    this.processElement(elementRef.nativeElement);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.config.reduce(
      (errors, { validator, message }) => ({
        ...errors,
        ...(validator(control) && { [validator.name]: message }),
      }),
      {},
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processElement($input: HTMLInputElement): void {}
}

export type ValidationConfig = ValidationConfigItem[];
export interface ValidationConfigItem {
  validator: ValidatorFn;
  message: string;
}
