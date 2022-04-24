import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import {
  FadeThroughAnimation,
  RouterAnimationStateReader,
} from '../../common/animations';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  viewProviders: [RouterAnimationStateReader],
  animations: [
    trigger('routerAnimation', [
      transition('* => list', FadeThroughAnimation.apply()),
    ]),
  ],
})
export class RoomsComponent implements OnInit {
  constructor(public routerAnimationStateReader: RouterAnimationStateReader) {}

  ngOnInit(): void {}
}
