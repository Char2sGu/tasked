import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoadingModule } from '../loading/loading.module';
import { RefetchButtonComponent } from './refetch-button.component';

@NgModule({
  declarations: [RefetchButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LoadingModule,
  ],
  exports: [RefetchButtonComponent],
})
export class RefetchButtonModule {}
