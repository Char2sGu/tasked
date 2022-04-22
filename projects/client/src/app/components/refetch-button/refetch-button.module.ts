import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RefetchButtonComponent } from './refetch-button.component';

@NgModule({
  declarations: [RefetchButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [RefetchButtonComponent],
})
export class RefetchButtonModule {}
