import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { SharedAxisAnimation } from '../../common/animations';
import { RouterOutletDataReader } from '../../common/router.helpers';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  viewProviders: [RouterOutletDataReader],
  animations: [
    trigger('routerAnimation', [
      transition('list => detail', [SharedAxisAnimation.apply('z', 'forward')]),
      transition('detail => list', [
        SharedAxisAnimation.apply('z', 'backward'),
      ]),
      transition('list => creation', [
        SharedAxisAnimation.apply('x', 'forward'),
      ]),
      transition('creation => list', [
        SharedAxisAnimation.apply('x', 'backward'),
      ]),
    ]),
  ],
})
export class TeamsComponent implements OnInit {
  constructor(public routerOutletDataReader: RouterOutletDataReader) {}

  ngOnInit(): void {}
}
