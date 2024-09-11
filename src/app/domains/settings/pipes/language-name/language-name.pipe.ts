import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'languageName',
  standalone: true,
})
export class LanguageNamePipe implements PipeTransform {
  constructor(private readonly translocoService: TranslocoService) {}

  public transform(value: unknown): Observable<string> {
    if (!value || typeof value !== 'string') {
      return of('');
    }
    switch (value) {
      case 'en': {
        return this.translocoService.selectTranslate(
          'domain.settings.dialog.language.button.en',
        );
      }
      case 'de': {
        return this.translocoService.selectTranslate(
          'domain.settings.dialog.language.button.de',
        );
      }
      default: {
        return of('');
      }
    }
  }
}
