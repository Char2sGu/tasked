import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  LayoutContent,
  LayoutContentContext,
  LayoutContents,
} from './layout.component';

@Directive({
  selector: '[appLayout]',
})
export class LayoutDirective implements OnInit, OnDestroy {
  @Input() appLayout!: LayoutContentNames;

  private target!: BehaviorSubject<LayoutContent>;
  private previous!: LayoutContent;

  constructor(
    private contents: LayoutContents,
    private templateRef: TemplateRef<LayoutContentContext>,
  ) {}

  ngOnInit(): void {
    if (!this.appLayout) return;
    this.target = this.contents[`${this.appLayout}$`];
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

type LayoutContentNames = {
  [Key in keyof LayoutContents]: Key extends `${infer Name}$` ? Name : never;
}[keyof LayoutContents];
