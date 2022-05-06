import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Initializable } from '../common/dependency-injection';

@Injectable({
  providedIn: 'root',
})
export class RouterHistory implements Initializable {
  previous?: string;
  current?: string;

  constructor(private router: Router) {}

  async init(): Promise<void> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previous = this.current;
        this.current = event.urlAfterRedirects;
      }
    });
  }
}
