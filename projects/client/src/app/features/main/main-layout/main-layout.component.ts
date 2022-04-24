import {
  AnimationReferenceMetadata,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { animationNameMap, FADE_THROUGH } from '../../../common/animations';

// TODO: complete this animation prototype

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition(`* => ${animationNameMap.get(FADE_THROUGH)}`, [
        useAnimation(FADE_THROUGH),
      ]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(private outletContexts: ChildrenOutletContexts) {}

  ngOnInit(): void {}

  getRouteAnimationName(): string | undefined {
    const context = this.outletContexts.getContext('primary');
    if (!context) throw new Error('Outlet context not found');
    const animation: AnimationReferenceMetadata | undefined =
      context.route?.snapshot.data['animation'];
    return animation && animationNameMap.get(animation);
  }
}
