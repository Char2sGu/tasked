import { Injectable } from '@angular/core';

import { LocalStorageItem } from '../../common/local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class RoomsActivatedMapStorage extends LocalStorageItem<Map> {
  constructor() {
    super(
      'roomMap',
      (v) =>
        typeof v == 'object' &&
        !!v &&
        Object.entries(v).every(
          ([userId, roomId]) =>
            typeof userId == 'string' && typeof roomId == 'string',
        ),
      {},
    );
  }
}

type Map = Record<string, string>;
