import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from '../../shared/shared.module';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [SharedModule, MatSlideToggleModule],
  exports: [ThemeSwitcherComponent],
})
export class ThemeSwitcherModule {}
