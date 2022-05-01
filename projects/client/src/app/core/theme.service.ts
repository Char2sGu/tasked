import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  first,
  map,
  merge,
  Observable,
  skip,
} from 'rxjs';

import { ThemeStorage } from './theme.storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme$: Observable<Theme>;
  readonly themeStored$ = this.storage.value$$;
  readonly themePreferred$ = this.watchPreference();
  readonly themePreferredChange$ = this.themePreferred$.pipe(skip(1));
  private $root = document.body as HTMLElement;
  private $themeColorMeta = this.queryMeta();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storage: ThemeStorage,
  ) {
    this.theme$ = combineLatest([this.themeStored$, this.themePreferred$]).pipe(
      map(([stored, preferred]) => stored ?? preferred),
      distinctUntilChanged(),
    );
  }

  init(): void {
    merge(this.theme$.pipe(first()), this.themePreferredChange$).subscribe(
      (theme) => this.apply(theme),
    );
  }

  apply(theme: Theme): void {
    if (theme == 'light') this.$root.classList.remove('dark');
    else this.$root.classList.add('dark');
    this.$themeColorMeta.content = this.getThemeColor();
    this.storage.next(theme).save();
  }

  toggle(): void {
    this.apply(this.storage.value == 'light' ? 'dark' : 'light');
  }

  private watchPreference(): Observable<Theme> {
    return this.breakpointObserver
      .observe('(prefers-color-scheme: light)')
      .pipe(map((state) => (state.matches ? 'light' : 'dark')));
  }

  private queryMeta(): HTMLMetaElement {
    return document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;
  }

  private getThemeColor() {
    return getComputedStyle(this.$root)
      .getPropertyValue('--pwa-theme-color')
      .trim();
  }
}

export type Theme = 'light' | 'dark';
