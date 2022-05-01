import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  LayoutConfiguration,
  LayoutContent,
  LayoutContentContext,
} from './layout.component';

@Directive({
  selector: '[appLayout]',
})
export class LayoutDirective implements OnInit, OnDestroy {
  @Input() appLayout!: LayoutContentName;

  private target!: BehaviorSubject<LayoutContent>;
  private previous!: LayoutContent;

  constructor(
    private configuration: LayoutConfiguration,
    private templateRef: TemplateRef<LayoutContentContext>,
  ) {}

  ngOnInit(): void {
    if (!this.appLayout) return;
    this.target = this.configuration[`${this.appLayout}$`];
    setTimeout(() => {
      this.previous = this.target.getValue();
      this.target.next(this.templateRef);
    });
  }

  ngOnDestroy(): void {
    if (!this.appLayout) return;
    this.target.next(this.previous);
  }

  // TODO: make it type-safe
  // this should work according to the document, but it's not
  // https://angular.io/guide/structural-directives#typing-the-directives-context
  static ngTemplateContextGuard = (
    directive: LayoutDirective,
    context: unknown,
  ): context is LayoutContentContext => true;
}

type LayoutContentName = {
  [Key in keyof LayoutConfiguration]: Key extends `${infer Name}$`
    ? Name
    : never;
}[keyof LayoutConfiguration];
