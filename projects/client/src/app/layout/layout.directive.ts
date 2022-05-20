import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
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
  @Input() appLayout?: LayoutContentName;
  @Input() appLayoutContent?: LayoutContent;

  private target!: BehaviorSubject<LayoutContent>;
  private previous!: LayoutContent;

  constructor(
    private configuration: LayoutConfiguration,
    @Optional() private templateRef?: TemplateRef<LayoutContentContext>,
  ) {}

  ngOnInit(): void {
    if (!this.appLayout) return;
    this.target = this.configuration[`${this.appLayout}$`];
    const content: LayoutContent =
      this.appLayoutContent === undefined
        ? this.templateRef ?? null
        : this.appLayoutContent;
    setTimeout(() => {
      this.previous = this.target.getValue();
      this.target.next(content);
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
