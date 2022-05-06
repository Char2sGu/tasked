import { LayoutModule as ResponsiveLayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Initializable } from '../common/dependency-injection';
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
    Initializable.provide(PwaService),
    Initializable.provide(RouterHistory),
    Initializable.provide(ThemeService),
  ],
})
export class CoreModule {}
