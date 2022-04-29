import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationModule } from '../validation/validation.module';
import { TruncationPipe } from './truncation.pipe';

@NgModule({
  declarations: [TruncationPipe],
  exports: [CommonModule, ValidationModule, TruncationPipe],
})
export class SharedModule {}
