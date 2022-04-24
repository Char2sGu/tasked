import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-layout-content',
  templateUrl: './layout-content.component.html',
  styleUrls: ['./layout-content.component.scss'],
})
export class LayoutContentComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  landscape$!: Observable<boolean>;

  private subscription?: Subscription;

  constructor(
    public auth: AuthService,
    private router: Router,
    private media: MediaObserver,
  ) {}

  ngOnInit(): void {
    this.landscape$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-md' && item.matches),
        ),
      );
    this.subscription = this.router.events.subscribe((event) => {
      const isDesktop = this.sidenav.mode == 'side';
      if (isDesktop) return;
      if (event instanceof NavigationStart) this.sidenav.close();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
