import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '../../shared/shared.module';
import { HelpIconComponent } from './help-icon/help-icon.component';

@NgModule({
  declarations: [HelpIconComponent],
  imports: [SharedModule, MatTooltipModule, MatIconModule],
  exports: [HelpIconComponent],
})
export class HelpIconModule {}
