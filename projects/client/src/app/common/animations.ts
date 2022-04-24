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
import { AnimationCurves } from '@angular/material/core';

export abstract class Animation {
  static readonly content: AnimationReferenceMetadata;

  static apply(..._args: unknown[]): AnimationAnimateRefMetadata {
    return useAnimation(this.content);
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

/**
 * @see https://material.io/design/motion/the-motion-system.html#shared-axis
 */
export class SharedXAxisAnimation extends Animation {
  static override content: AnimationReferenceMetadata = animation([
    style({ position: 'relative', overflow: 'hidden' }),
    query(
      ':enter, :leave',
      style({ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }),
    ),
    group([
      query(':leave', [
        animate(
          `90ms ${AnimationCurves.ACCELERATION_CURVE}`,
          style({ opacity: 0 }),
        ),
      ]),
      query(':enter', [
        style({ opacity: 0 }),
        animate(
          `210ms 90ms ${AnimationCurves.DECELERATION_CURVE}`,
          style({ opacity: 1 }),
        ),
      ]),
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          `300ms ${AnimationCurves.STANDARD_CURVE}`,
          style({
            transform: `translateX({{ offsetOutgoing }})`,
          }),
        ),
      ]),
      query(':enter', [
        style({
          transform: `translateX({{ offsetIncoming }})`,
        }),
        animate(
          `300ms ${AnimationCurves.STANDARD_CURVE}`,
          style({ transform: 'translateX(0)' }),
        ),
      ]),
    ]),
  ]);

  static override apply(
    mode: 'forward' | 'backward',
  ): AnimationAnimateRefMetadata {
    return useAnimation(this.content, {
      params:
        mode == 'forward'
          ? { offsetIncoming: '30px', offsetOutgoing: '-30px' }
          : { offsetIncoming: '-30px', offsetOutgoing: '30px' },
    });
  }
}
