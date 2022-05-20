import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  first,
  map,
  merge,
  Observable,
  skip,
} from 'rxjs';

import { Initializable } from '../common/dependency-injection';
import { ThemeStorage } from './theme.storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements Initializable {
  readonly theme$: Observable<Theme>;
  readonly themeStored$ = this.storage.value$$;
  readonly themePreferred$ = this.watchPreference();
  readonly themePreferredChange$ = this.themePreferred$.pipe(skip(1));
  private $root = this.document.body;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private breakpointObserver: BreakpointObserver,
    private storage: ThemeStorage,
  ) {
    this.theme$ = combineLatest([this.themeStored$, this.themePreferred$]).pipe(
      map(([stored, preferred]) => stored ?? preferred),
      distinctUntilChanged(),
    );
  }

  async init(): Promise<void> {
    merge(this.theme$.pipe(first()), this.themePreferredChange$).subscribe(
      (theme) => this.apply(theme),
    );
  }

  apply(theme: Theme): void {
    if (theme === 'light') this.$root.classList.remove('dark');
    else this.$root.classList.add('dark');
    this.storage.next(theme).save();
  }

  toggle(): void {
    this.apply(this.storage.value === 'light' ? 'dark' : 'light');
  }

  private watchPreference(): Observable<Theme> {
    return this.breakpointObserver
      .observe('(prefers-color-scheme: light)')
      .pipe(map((state) => (state.matches ? 'light' : 'dark')));
  }
}

export type Theme = 'light' | 'dark';
