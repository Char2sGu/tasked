import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { Notifier } from './notifier.service';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  constructor(private swUpdate: SwUpdate, private notifier: Notifier) {}

  init(): void {
    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type == 'VERSION_READY')
        this.notifier.info('New version is available, refresh to upgrade');
    });
  }
}
