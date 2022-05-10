import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../../shared/shared.module';
import { AppBarComponent } from './app-bar/app-bar.component';

@NgModule({
  declarations: [AppBarComponent],
  imports: [SharedModule, MatToolbarModule],
  exports: [AppBarComponent],
})
export class AppBarModule {}
