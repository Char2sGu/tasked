import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[equals]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualsValidator, multi: true },
  ],
})
export class EqualsValidator implements Validator {
  @Input() equals = '';

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == this.equals) return null;
    else return { equals: false };
  }
}
