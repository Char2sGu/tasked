import { Directive } from '@angular/core';
import { Validators } from '@angular/forms';
import { patterns } from 'common';

import {
  provideValidator,
  Validation,
  ValidationConfig,
} from './shared/validation-common';

@Directive({
  selector: 'input[validation="username"]',
  providers: [provideValidator(UsernameValidation)],
})
export class UsernameValidation extends Validation {
  override config: ValidationConfig = [
    {
      validator: Validators.maxLength(15),
      message: 'Username must be at most 15 characters long',
    },
    {
      validator: Validators.pattern(patterns.username),
      message: "Username must consist of only letters, numbers, '_' and '-'",
    },
  ];

  override processElement($input: HTMLInputElement): void {
    $input.maxLength = 15;
  }
}
