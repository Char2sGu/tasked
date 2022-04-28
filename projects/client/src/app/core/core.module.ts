import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PostponementInterceptor } from './postponement.interceptor';
import { RouterHistory } from './router-history.service';
import { ThemeService } from './theme.service';

@NgModule({
  providers: [
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
