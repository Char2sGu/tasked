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
      text: 'Applications',
      commands: ['/', 'app', 'applications'],
      icon: 'group_add',
    },
    {
      text: 'Rooms',
      commands: ['/', 'app', 'rooms'],
      icon: 'workspaces',
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
