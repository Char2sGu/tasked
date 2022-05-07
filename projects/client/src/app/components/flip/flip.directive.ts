import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FlipScopeDirective } from './flip-scope.directive';

@Directive({
  selector: '[appFlip]',
})
export class FlipDirective implements OnInit, OnDestroy {
  @Input() @HostBinding('attr.data-flip-key') appFlip?: string;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Host() private scope: FlipScopeDirective,
  ) {}

  ngOnInit(): void {
    if (!this.appFlip) this.appFlip = this.getDefaultKey(); // require a manual assign otherwise host binding will not work
    this.scope.items.set(this, this.elementRef.nativeElement);
  }
  ngOnDestroy(): void {
    this.scope.items.delete(this);
  }

  private getDefaultKey(): string {
    return `anonymous-${new Date().getTime()}`;
  }
}
