import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { FadeThroughAnimation } from './common/animations';
import { RouterOutletDataReader } from './common/router.helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [RouterOutletDataReader],
  animations: [
    trigger('content', [
      transition('auth <=> main', FadeThroughAnimation.apply()),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(public routerOutletDataReader: RouterOutletDataReader) {}

  ngOnInit(): void {}
}
