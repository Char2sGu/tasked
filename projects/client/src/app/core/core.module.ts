import { LayoutModule as ResponsiveLayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Notifier, SnackbarNotifier } from './notifier.service';
import { PostponementInterceptor } from './postponement.interceptor';
import { PwaService } from './pwa.service';
import { RouterHistory } from './router-history.service';
import { ThemeService } from './theme.service';

@NgModule({
  imports: [ResponsiveLayoutModule, MatSnackBarModule],
  providers: [
    { provide: Notifier, useClass: SnackbarNotifier },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostponementInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(
    themeService: ThemeService,
    routerHistory: RouterHistory,
    pwaService: PwaService,
  ) {
    themeService.init();
    routerHistory.init();
    pwaService.init();
  }
}
