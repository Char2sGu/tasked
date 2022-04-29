import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Notifier, SnackbarNotifier } from './notifier.service';
import { PostponementInterceptor } from './postponement.interceptor';
import { RouterHistory } from './router-history.service';
import { ThemeService } from './theme.service';

@NgModule({
  imports: [MatSnackBarModule],
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
  constructor(themeService: ThemeService, routerHistory: RouterHistory) {
    themeService.init();
    routerHistory.init();
  }
}
