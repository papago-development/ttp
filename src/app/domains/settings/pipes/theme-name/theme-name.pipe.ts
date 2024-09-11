import { Pipe, PipeTransform } from '@angular/core';
import { Theme } from '@app/store';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Pipe({
  name: 'themeName',
  standalone: true,
})
export class ThemeNamePipe implements PipeTransform {
  constructor(private readonly translocoService: TranslocoService) {}

  public transform(value: unknown): Observable<string> {
    if (!value || typeof value !== 'string') {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.theme.button.system',
      );
    }
    if (value === Theme.Dark) {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.theme.button.dark',
      );
    } else if (value === Theme.Light) {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.theme.button.light',
      );
    } else {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.theme.button.system',
      );
    }
  }
}
