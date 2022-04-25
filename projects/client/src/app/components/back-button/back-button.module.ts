import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [SharedModule, RouterModule, MatButtonModule, MatIconModule],
  exports: [BackButtonComponent],
})
export class BackButtonModule {}
