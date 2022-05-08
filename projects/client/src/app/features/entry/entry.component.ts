import { transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil, timer } from 'rxjs';

import { FadeThroughAnimation } from '../../common/animations';
import { RouterOutletDataReader } from '../../common/router.helpers';
import { skipNullable } from '../../common/rxjs';
import { AuthService } from '../../core/auth.service';
import { Notifier } from '../../core/notifier.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  viewProviders: [RouterOutletDataReader],
  animations: [
    trigger('router', [
      transition(':leave', []),
      transition('* => *', [FadeThroughAnimation.apply()]),
    ]),
  ],
})
export class EntryComponent implements OnInit, OnDestroy {
  user$ = this.authService.user$;
  links: Link[] = [
    {
      text: 'Teams',
      commands: ['/', 'app', 'teams'],
      icon: 'workspaces',
    },
    {
      text: 'Requests',
      commands: ['/', 'app', 'membership-requests'],
      icon: 'group_add',
    },
    {
      text: 'Settings',
      commands: ['/', 'app', 'settings'],
      icon: 'settings',
    },
  ];

  private destroy$ = new Subject();

  constructor(
    public routerOutletDataReader: RouterOutletDataReader,
    private router: Router,
    private authService: AuthService,
    private notifier: Notifier,
  ) {}

  ngOnInit(): void {
    this.authService.authorization$
      .pipe(
        skipNullable(),
        switchMap((auth) => timer(auth.expiresAfter)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.notifier.info('Session expired');
        this.router.navigate(['/', 'auth']);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  onLogout(): void {
    this.router.navigate(['/', 'auth']);
  }
}

interface Link {
  text: string;
  commands: unknown[];
  icon: string;
}
