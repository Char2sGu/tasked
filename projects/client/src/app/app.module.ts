import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotifierModule } from 'angular-notifier';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IllustrationModule } from './components/illustration/illustration.module';
import { CoreModule } from './core/core.module';
import { GraphqlModule } from './graphql/graphql.module';
import { LayoutModule } from './layout/layout.module';

// TODO: offline support

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    NotifierModule,
    GraphqlModule,
    AppRoutingModule,
    IllustrationModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
