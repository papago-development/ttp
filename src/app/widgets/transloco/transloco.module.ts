import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import {
  provideTransloco,
  TranslocoModule as TranslocoBaseModule,
} from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideTranslocoPersistTranslations } from '@jsverse/transloco-persist-translations';
import { TranslocoHttpLoader } from './transloco-loader';

@NgModule({
  exports: [TranslocoBaseModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'de'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoPersistLang({
      storage: { useValue: localStorage },
    }),
    provideTranslocoPersistTranslations({
      loader: TranslocoHttpLoader,
      storage: { useValue: localStorage },
    }),
  ],
})
export class TranslocoModule {}
