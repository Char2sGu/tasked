import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { FADE_THROUGH } from '../../../common/animations';

// TODO: complete this animation prototype

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('fadeThrough', [
      transition('* <=> *', [useAnimation(FADE_THROUGH)]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteComponent(): unknown {
    return this.contexts.getContext('primary')?.route?.snapshot.url;
  }

  ngOnInit(): void {}
}
