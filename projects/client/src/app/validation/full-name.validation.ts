import { Directive } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  provideValidator,
  Validation,
  ValidationConfig,
} from './shared/validation-common';

@Directive({
  selector: 'input[validation="full-name"]',
  providers: [provideValidator(FullNameValidation)],
})
export class FullNameValidation extends Validation {
  override config: ValidationConfig = [
    {
      validator: Validators.maxLength(15),
      message: 'Cannot be more than 15 characters',
    },
    {
      validator: Validators.pattern(/^[^\s]*$/),
      message: 'Cannot contain consecutive white spaces',
    },
  ];

  override processElement($input: HTMLInputElement): void {
    $input.maxLength = 15;
  }
}
