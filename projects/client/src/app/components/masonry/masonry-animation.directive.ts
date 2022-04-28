import { animate, style } from '@angular/animations';
import { Directive } from '@angular/core';
import { AnimationCurves, AnimationDurations } from '@angular/material/core';
import { NgxMasonryAnimations, NgxMasonryComponent } from 'ngx-masonry';

@Directive({
  selector: 'ngx-masonry',
})
export class MasonryAnimationDirective {
  private animation: NgxMasonryAnimations = {
    show: [
      style({ opacity: 0 }),
      animate(
        `${AnimationDurations.ENTERING} ${AnimationCurves.STANDARD_CURVE}`,
        style({ opacity: 1 }),
      ),
    ],
    hide: [
      style({ opacity: '*' }),
      animate(
        `${AnimationDurations.EXITING} ${AnimationCurves.STANDARD_CURVE}`,
        style({ opacity: 0 }),
      ),
    ],
  };

  constructor(private masonry: NgxMasonryComponent) {
    this.masonry.options = this.masonry.options ?? {};
    this.masonry.options.animations = this.animation;
  }
}
