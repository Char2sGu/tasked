import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LoadingDirective } from './loading.directive';

@NgModule({
  declarations: [LoadingDirective],
  imports: [SharedModule],
  exports: [LoadingDirective],
})
export class LoadingModule {}
