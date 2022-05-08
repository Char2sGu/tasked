import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationModule } from '../validation/validation.module';
import { LogPipe } from './log.pipe';
import { TruncationPipe } from './truncation.pipe';

@NgModule({
  declarations: [TruncationPipe, LogPipe],
  exports: [CommonModule, ValidationModule, TruncationPipe, LogPipe],
})
export class SharedModule {}
