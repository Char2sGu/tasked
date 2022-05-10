import { transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

import { FadeThroughAnimation } from '../../common/animations';
import { RouterOutletDataReader } from '../../common/router.helpers';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [RouterOutletDataReader],
  animations: [
    trigger('routerAnimation', [
      transition('login <=> signup', [FadeThroughAnimation.apply()]),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  constructor(
    public routerOutletDataReader: RouterOutletDataReader,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    // TODO: better implementation
    // animation
    timer(1000).subscribe(() => this.auth.logout());
  }
}
