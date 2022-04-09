import { NgModule } from '@angular/core';

import { ThemedFormFieldDirective } from './themed-form-field.directive';

@NgModule({
  declarations: [ThemedFormFieldDirective],
  exports: [ThemedFormFieldDirective],
})
export class ThemeModule {}
