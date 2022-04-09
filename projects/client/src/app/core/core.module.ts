import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PostponementInterceptor } from './postponement.interceptor';

@NgModule({
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostponementInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
