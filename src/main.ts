/* eslint-disable unicorn/prefer-top-level-await */
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ErrorHandler,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { AppComponent } from '@app/app.component';
import { ErrorHandlerService } from '@app/core';
import { routes } from '@app/routes';
import { getModeForIonicModule } from '@app/store';
import { TranslocoModule } from '@app/widgets/transloco';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { enableElfProdMode } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';
import { provideQueryClientOptions } from '@ngneat/query';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableElfProdMode();
} else {
  devTools();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, TranslocoModule),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideIonicAngular({
      mode: getModeForIonicModule(),
      backButtonDefaultHref: '/',
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withRouterConfig({
        /**
         * @see https://github.com/angular/angular/issues/13586
         */
        canceledNavigationResolution: 'computed',
      }),
    ),
    provideQueryClientOptions({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  ],
}).catch(error => console.log(error));
