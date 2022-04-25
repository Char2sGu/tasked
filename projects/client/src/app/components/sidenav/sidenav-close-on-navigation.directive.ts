import { Directive, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'mat-sidenav',
})
export class SidenavCloseOnNavigationDirective implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(private router: Router, private sidenav: MatSidenav) {}

  ngOnInit(): void {
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
