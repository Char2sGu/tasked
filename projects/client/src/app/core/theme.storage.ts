import { Injectable } from '@angular/core';

import { LocalStorageItem } from '../common/local-storage';
import { Theme } from '../core/theme.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorage extends LocalStorageItem<Theme | null> {
  constructor() {
    super(
      'theme',
      (v) => (v as Theme) === 'light' || (v as Theme) === 'dark',
      null,
    );
  }
}
