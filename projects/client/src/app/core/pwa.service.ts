import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { Notifier } from './notifier.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private $themeColorMeta = this.selectThemeColorMeta();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService,
    private swUpdate: SwUpdate,
    private notifier: Notifier,
  ) {}

  init(): void {
    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type == 'VERSION_READY')
        this.notifier.info('New version is available, refresh to upgrade');
    });
    this.themeService.theme$.subscribe(() => this.updateThemeColor());
  }

  private updateThemeColor(): void {
    this.$themeColorMeta.content = getComputedStyle(this.document.body)
      .getPropertyValue('--pwa-theme-color')
      .trim();
  }

  private selectThemeColorMeta(): HTMLMetaElement {
    return this.document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;
  }
}
