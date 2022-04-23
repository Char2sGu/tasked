import { Component, OnInit } from '@angular/core';

// TODO: show a badge when pending applications exist

@Component({
  selector: 'app-main-layout-sidenav',
  templateUrl: './main-layout-sidenav.component.html',
  styleUrls: ['./main-layout-sidenav.component.scss'],
})
export class MainLayoutSidenavComponent implements OnInit {
  items: Item[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        title: 'Applications',
        route: '/applications',
        icon: 'person_add_alt_1',
      },
    ];
  }
}

interface Item {
  title: string;
  route: string;
  icon: string;
}
