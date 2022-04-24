import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { FadeThroughAnimation } from '../../../common/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('rooms <=> applications', [FadeThroughAnimation.use()]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(private outletContexts: ChildrenOutletContexts) {}

  ngOnInit(): void {}

  getRouteAnimationState(): string | undefined {
    const context = this.outletContexts.getContext('primary');
    return context?.route?.snapshot.data['animationState'];
  }
}
