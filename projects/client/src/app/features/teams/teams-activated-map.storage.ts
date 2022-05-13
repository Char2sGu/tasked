import { Injectable } from '@angular/core';

import { LocalStorageItem } from '../../common/local-storage';

@Injectable({
  providedIn: 'root',
})
export class TeamsActivatedMapStorage extends LocalStorageItem<Map> {
  constructor() {
    super(
      'teamMap',
      (v) =>
        typeof v === 'object' &&
        !!v &&
        Object.entries(v).every(
          ([userId, teamId]) =>
            typeof userId === 'string' && typeof teamId === 'string',
        ),
      {},
    );
  }
}

type Map = Record<string, string>;
