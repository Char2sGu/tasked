import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

import { provideValidator } from './shared/validation-common';

@Directive({
  selector: '[equals]',
  providers: [provideValidator(EqualsValidator)],
})
export class EqualsValidator implements Validator {
  @Input() equals = '';

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == this.equals) return null;
    else return { equals: false };
  }
}
