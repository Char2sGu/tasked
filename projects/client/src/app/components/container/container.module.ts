import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [ContainerComponent],
  imports: [SharedModule],
  exports: [ContainerComponent],
})
export class ContainerModule {}
