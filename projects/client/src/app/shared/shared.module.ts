import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationModule } from '../validation/validation.module';
import { RouterEventsDirective } from './router-events.directive';

@NgModule({
  declarations: [RouterEventsDirective],
  exports: [CommonModule, ValidationModule, RouterEventsDirective],
})
export class SharedModule {}
