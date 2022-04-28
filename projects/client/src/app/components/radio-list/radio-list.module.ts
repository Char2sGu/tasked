import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from '../../shared/shared.module';
import { RadioListComponent } from './radio-list/radio-list.component';

@NgModule({
  declarations: [RadioListComponent],
  imports: [SharedModule, FormsModule, MatListModule, MatRadioModule],
  exports: [RadioListComponent],
})
export class RadioListModule {}
