import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterHistory {
  previous?: string;
  current?: string;

  constructor(private router: Router) {}

  init(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previous = this.current;
        this.current = event.urlAfterRedirects;
      }
    });
  }
}
