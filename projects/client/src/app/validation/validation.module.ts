import { NgModule } from '@angular/core';

import { EqualsValidator } from './equals.validator';
import { FullNameValidation } from './full-name.validation';
import { PasswordValidation } from './password.validation';
import { UsernameValidation } from './username.validation';
import { ValidationErrorMessagePipe } from './validation-error-message.pipe';

@NgModule({
  declarations: [
    EqualsValidator,
    UsernameValidation,
    PasswordValidation,
    FullNameValidation,
    ValidationErrorMessagePipe,
  ],
  imports: [],
  exports: [
    EqualsValidator,
    UsernameValidation,
    PasswordValidation,
    FullNameValidation,
    ValidationErrorMessagePipe,
  ],
})
export class ValidationModule {}
