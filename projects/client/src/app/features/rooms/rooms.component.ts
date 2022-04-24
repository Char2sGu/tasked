import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { FadeThroughAnimation } from '../../common/animations';
import { RouterOutletDataReader } from '../../common/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  viewProviders: [RouterOutletDataReader],
  animations: [
    trigger('routerAnimation', [
      transition('* => list', FadeThroughAnimation.apply()),
    ]),
  ],
})
export class RoomsComponent implements OnInit {
  constructor(public routerOutletDataReader: RouterOutletDataReader) {}

  ngOnInit(): void {}
}
