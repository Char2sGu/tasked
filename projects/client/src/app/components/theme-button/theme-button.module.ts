import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ThemeButtonComponent } from './theme-button.component';

@NgModule({
  declarations: [ThemeButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  exports: [ThemeButtonComponent],
})
export class ThemeButtonModule {}
