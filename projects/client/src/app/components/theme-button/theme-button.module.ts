import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeButtonComponent } from './theme-button.component';

@NgModule({
  declarations: [ThemeButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ThemeButtonComponent],
})
export class ThemeButtonModule {}
