import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';

import { MasonryAutoResizeDirective } from './masonry-auto-resize.directive';

@NgModule({
  declarations: [MasonryAutoResizeDirective],
  imports: [CommonModule],
  exports: [NgxMasonryModule, MasonryAutoResizeDirective],
})
export class MasonryModule {}
