import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LayoutContent, LayoutContents } from './layout/layout.component';

@Directive({
  selector: '[appLayout]',
})
export class LayoutDirective implements OnInit, OnDestroy {
  @Input() appLayout?: LayoutContentNames;

  private target!: BehaviorSubject<LayoutContent>;
  private previous!: LayoutContent;

  constructor(
    private contents: LayoutContents,
    private templateRef: TemplateRef<never>,
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
}

type LayoutContentNames = {
  [Key in keyof LayoutContents]: Key extends `${infer Name}$` ? Name : never;
}[keyof LayoutContents];
