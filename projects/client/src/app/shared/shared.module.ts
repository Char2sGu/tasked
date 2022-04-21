import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ValidationModule } from '../validation/validation.module';

@NgModule({
  exports: [CommonModule, FormsModule, FlexLayoutModule, ValidationModule],
})
export class SharedModule {}
