import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';

import { SharedModule } from '../../shared/shared.module';
import { InfinityScrollTriggerComponent } from './infinity-scroll-trigger/infinity-scroll-trigger.component';

@NgModule({
  declarations: [InfinityScrollTriggerComponent],
  imports: [SharedModule, IntersectionObserverModule, MatProgressSpinnerModule],
  exports: [InfinityScrollTriggerComponent],
})
export class InfinityScrollModule {}
