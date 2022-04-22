/**
 * All illustrations come from https://undraw.co/.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoDataIllustrationComponent } from './no-data-illustration/no-data-illustration.component';

@NgModule({
  declarations: [NoDataIllustrationComponent],
  imports: [CommonModule],
  exports: [NoDataIllustrationComponent],
})
export class IllustrationsModule {}
