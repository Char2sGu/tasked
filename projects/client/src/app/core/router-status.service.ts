import { Injectable } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { debounceTime, filter, mapTo, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterStatus {
  navigating$ = merge(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      mapTo(true),
    ),
    this.router.events.pipe(
      filter(
        (event) =>
          event instanceof NavigationEnd || event instanceof NavigationError,
      ),
      mapTo(false),
    ),
  );
  navigatingAndLoading$ = this.navigating$.pipe(debounceTime(200));

  constructor(private router: Router) {}
}
