import {
  animate,
  animation,
  AnimationAnimateRefMetadata,
  AnimationReferenceMetadata,
  group,
  query,
  style,
  useAnimation,
} from '@angular/animations';
import { Injectable } from '@angular/core';
import { AnimationCurves } from '@angular/material/core';
import { ChildrenOutletContexts } from '@angular/router';

export abstract class Animation {
  static readonly content: AnimationReferenceMetadata;

  static apply(): AnimationAnimateRefMetadata {
    return useAnimation(this.content);
  }
}

@Injectable()
export class RouterAnimationStateReader {
  constructor(private contexts: ChildrenOutletContexts) {}

  read(): string | undefined {
    const context = this.contexts.getContext('primary');
    return context?.route?.snapshot.data['animationState'];
  }
}

/**
 * @see https://material.io/design/motion/the-motion-system.html#fade-through
 */
export class FadeThroughAnimation extends Animation {
  static override content: AnimationReferenceMetadata = animation([
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }),
    ]),
    query(':leave', [style({ opacity: 1 })], { optional: true }),
    query(':enter', [style({ transform: 'scale(92%)', opacity: 0 })]),
    group([
      query(
        ':leave',
        [
          animate(
            `90ms ${AnimationCurves.STANDARD_CURVE}`,
            style({ opacity: 0 }),
          ),
        ],
        { optional: true },
      ),
      query(':enter', [
        animate(
          `210ms 90ms ${AnimationCurves.STANDARD_CURVE}`,
          style({ transform: 'scale(1)', opacity: 1 }),
        ),
      ]),
    ]),
  ]);
}
