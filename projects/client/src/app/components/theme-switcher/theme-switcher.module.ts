import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from '../../shared/shared.module';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [SharedModule, FormsModule, MatSlideToggleModule],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
