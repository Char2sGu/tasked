import { Injectable } from '@angular/core';

import { LocalStorageItem } from '../common/local-storage-item.class';
import { ThemeStorage } from './theme.storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public current: LocalStorageItem<Theme>;

  private $root: HTMLElement;
  private $themeColorMeta: HTMLMetaElement;

  constructor(storage: ThemeStorage) {
    this.current = storage.next(storage.value ?? this.getPreference());
    this.$root = document.body as HTMLElement;
    this.$themeColorMeta = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;
  }

  init(): void {
    this.apply(this.current.value);
  }

  apply(theme: Theme): void {
    if (theme == 'light') this.$root.classList.remove('dark');
    else this.$root.classList.add('dark');
    this.$themeColorMeta.content = this.getThemeColor();
    this.current.next(theme).save();
  }

  toggle(): void {
    this.apply(this.current.value == 'light' ? 'dark' : 'light');
  }

  private getPreference(): Theme {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  private getThemeColor() {
    return getComputedStyle(this.$root)
      .getPropertyValue('--pwa-theme-color')
      .trim();
  }
}

export type Theme = 'light' | 'dark';
