import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlipDirective } from './flip.directive';
import { FlipScopeDirective } from './flip-scope.directive';

/**
 * Angular Adaption of Flipping.
 * @see https://aerotwist.com/blog/flip-your-animations/
 * @see https://css-tricks.com/animating-layouts-with-the-flip-technique/
 */
@NgModule({
  declarations: [FlipDirective, FlipScopeDirective],
  imports: [CommonModule],
  exports: [FlipDirective, FlipScopeDirective],
})
export class FlipModule {}
