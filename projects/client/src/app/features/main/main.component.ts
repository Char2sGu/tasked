import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { FadeThroughAnimation } from '../../common/animations';
import { RouterOutletDataReader } from '../../common/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  viewProviders: [RouterOutletDataReader],
  animations: [
    trigger('fadeThrough', [
      transition('teams <=> applications', [FadeThroughAnimation.apply()]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  links: Link[] = [
    {
      text: 'Teams',
      commands: ['/', 'app', 'teams'],
      icon: 'workspaces',
    },
    {
      text: 'Applications',
      commands: ['/', 'app', 'applications'],
      icon: 'group_add',
    },
  ];

  constructor(public routerOutletDataReader: RouterOutletDataReader) {}

  ngOnInit(): void {}
}

interface Link {
  text: string;
  commands: unknown[];
  icon: string;
}
