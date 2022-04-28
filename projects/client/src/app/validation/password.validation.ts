import { Directive } from '@angular/core';
import { Validators } from '@angular/forms';

import {
  provideValidator,
  Validation,
  ValidationConfig,
} from './shared/validation-common';

@Directive({
  selector: 'input[validation="password"]',
  providers: [provideValidator(PasswordValidation)],
})
export class PasswordValidation extends Validation {
  override config: ValidationConfig = [
    {
      validator: Validators.minLength(6),
      message: 'Password must be at least 6 characters long',
    },
    {
      validator: Validators.maxLength(20),
      message: 'Password must be at most 20 characters long',
    },
  ];

  override processElement($input: HTMLInputElement): void {
    $input.minLength = 6;
    $input.maxLength = 20;
  }
}
