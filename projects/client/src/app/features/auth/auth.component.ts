import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { FadeThroughAnimation } from '../../common/animations';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('login <=> signup', [FadeThroughAnimation.apply()]),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  constructor(
    private routerOutletContexts: ChildrenOutletContexts,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.logout();
  }

  getRouterAnimationState(): string {
    return this.routerOutletContexts.getContext('primary')?.route?.snapshot
      .data['animationState'];
  }
}
