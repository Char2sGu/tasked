import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UsernameComponent } from './username/username.component';

@NgModule({
  declarations: [UsernameComponent],
  imports: [SharedModule],
  exports: [UsernameComponent],
})
export class UsernameModule {}
