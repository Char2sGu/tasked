import { Injectable } from '@angular/core';

import { LocalStorageItem } from '../../common/local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorage extends LocalStorageItem<string | null> {
  constructor() {
    super('token', (v) => v == null || typeof v == 'string', null);
  }
}
