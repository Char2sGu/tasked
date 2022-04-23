import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmptyStateIllustrationComponent } from './empty-state-illustration/empty-state-illustration.component';

@NgModule({
  declarations: [EmptyStateIllustrationComponent],
  imports: [CommonModule],
  exports: [EmptyStateIllustrationComponent],
})
export class EmptyStateModule {}
