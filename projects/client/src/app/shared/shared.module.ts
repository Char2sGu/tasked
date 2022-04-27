import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ValidationModule } from '../validation/validation.module';
import { RouterEventsDirective } from './router-events.directive';

@NgModule({
  declarations: [RouterEventsDirective],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ValidationModule,
    RouterEventsDirective,
  ],
})
export class SharedModule {}
