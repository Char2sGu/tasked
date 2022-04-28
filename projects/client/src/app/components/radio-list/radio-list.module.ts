import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from '../../shared/shared.module';
import { RadioListComponent } from './radio-list/radio-list.component';

@NgModule({
  declarations: [RadioListComponent],
  imports: [SharedModule, MatListModule, MatRadioModule],
  exports: [RadioListComponent],
})
export class RadioListModule {}
