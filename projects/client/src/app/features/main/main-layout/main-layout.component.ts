import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import {
  FadeThroughAnimation,
  RouteAnimationManager,
} from '../../../common/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition(`* => ${FadeThroughAnimation.name}`, [
        FadeThroughAnimation.use(),
      ]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(private outletContexts: ChildrenOutletContexts) {}

  ngOnInit(): void {}

  getRouteAnimationName(): string | undefined {
    const context =
      this.outletContexts.getContext('primary')?.route?.snapshot.data ?? {};
    return RouteAnimationManager.read(context);
  }
}
