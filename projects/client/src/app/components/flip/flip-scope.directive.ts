import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AnimationCurves } from '@angular/material/core';
import Flipping from 'flipping/lib/adapters/web';
import { filter, takeUntil, tap } from 'rxjs';

import { FlipDirective } from './flip.directive';

@Directive({
  selector: '[appFlipScope]',
})
export class FlipScopeDirective implements OnInit, OnDestroy {
  @Input() appFlipScopeActive = false;
  @Output() appFlipScopeActiveChange = new EventEmitter<boolean>();
  readonly items = new Map<FlipDirective, HTMLElement>();
  private flipper!: Flipping;
  private destroy$ = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.flipper = new Flipping({
      parent: this.elementRef.nativeElement,
      selector: () => [...this.items.values()],
      duration: 225,
      easing: AnimationCurves.STANDARD_CURVE,
    });
    // FLIP must be triggered after the DOM is updated and before it is
    // rendered. NgZone seems to be the only choice for the requirement.
    this.ngZone.onStable
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.appFlipScopeActive),
        tap(() => this.appFlipScopeActiveChange.emit(false)),
      )
      .subscribe(() => this.flip());
  }
  ngOnDestroy(): void {
    this.destroy$.emit();
  }

  save(): void {
    this.flipper.read();
  }
  flip(): void {
    this.flipper.flip();
  }
}
