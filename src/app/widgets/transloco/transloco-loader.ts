import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  public getTranslation(
    lang: string,
  ): Observable<Translation> | Promise<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}
