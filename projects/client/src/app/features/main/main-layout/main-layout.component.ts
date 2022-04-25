import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { FadeThroughAnimation } from '../../../common/animations';
import { RouterOutletDataReader } from '../../../common/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  viewProviders: [RouterOutletDataReader],
  animations: [
    trigger('fadeThrough', [
      transition('rooms <=> applications', [FadeThroughAnimation.apply()]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(public routerOutletDataReader: RouterOutletDataReader) {}

  ngOnInit(): void {}
}
