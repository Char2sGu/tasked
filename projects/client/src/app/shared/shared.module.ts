import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationModule } from '../validation/validation.module';

@NgModule({
  exports: [CommonModule, ValidationModule],
})
export class SharedModule {}
