import { transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { FadeThroughAnimation } from '../../common/animations';
import { Breakpoint } from '../../common/breakpoint.enum';
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
  isDesktop$ = this.breakpointObserver
    .observe(Breakpoint.Middle)
    .pipe(map((state) => state.matches));

  constructor(
    public routerOutletDataReader: RouterOutletDataReader,
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.logout();
  }
}
