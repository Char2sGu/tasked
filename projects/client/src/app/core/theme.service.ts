import { Injectable } from '@angular/core';

import { LocalStorageItem } from '../common/local-storage-item.class';
import { ThemeStorage } from './theme.storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public current: LocalStorageItem<Theme>;

  private $root: HTMLHtmlElement;
  private $themeColorMeta: HTMLMetaElement;

  constructor(storage: ThemeStorage) {
    this.current = storage.next(storage.value ?? this.getPreference());
    this.$root = document.documentElement as HTMLHtmlElement;
    this.$themeColorMeta = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;
  }

  init(): void {
    this.apply(this.current.value);
  }

  apply(theme: Theme): void {
    this.$root.classList.remove(this.getClassName(this.current.value));
    this.$root.classList.add(this.getClassName(theme));
    this.$themeColorMeta.content = this.getThemeColor();
    this.current.next(theme).save();
  }

  toggle(): void {
    this.apply(this.current.value == 'light' ? 'dark' : 'light');
  }

  private getClassName(theme: Theme) {
    return `theme-${theme}`;
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
