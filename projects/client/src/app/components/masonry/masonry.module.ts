import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';

import { MasonryAnimationDirective } from './masonry-animation.directive';
import { MasonryAutoResizeDirective } from './masonry-auto-resize.directive';

@NgModule({
  declarations: [MasonryAutoResizeDirective, MasonryAnimationDirective],
  imports: [CommonModule],
  exports: [
    NgxMasonryModule,
    MasonryAutoResizeDirective,
    MasonryAnimationDirective,
  ],
})
export class MasonryModule {}
