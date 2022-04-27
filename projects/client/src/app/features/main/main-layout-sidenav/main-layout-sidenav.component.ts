import { Component, OnInit } from '@angular/core';

// TODO: show a badge when pending applications exist

@Component({
  selector: 'app-main-layout-sidenav',
  templateUrl: './main-layout-sidenav.component.html',
  styleUrls: ['./main-layout-sidenav.component.scss'],
})
export class MainLayoutSidenavComponent implements OnInit {
  items: Item[] = [
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

  constructor() {}

  ngOnInit(): void {}
}

interface Item {
  text: string;
  commands: unknown[];
  icon: string;
}
