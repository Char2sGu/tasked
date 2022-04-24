import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import {
  FadeThroughAnimation,
  RouterAnimationStateReader,
} from '../../../common/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  viewProviders: [RouterAnimationStateReader],
  animations: [
    trigger('routerAnimation', [
      transition('* => applications', [FadeThroughAnimation.apply()]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(public routerAnimationStateReader: RouterAnimationStateReader) {}

  ngOnInit(): void {}
}
