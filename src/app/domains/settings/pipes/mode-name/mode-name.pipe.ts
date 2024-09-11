import { Pipe, PipeTransform } from '@angular/core';
import { Mode } from '@app/store';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Pipe({
  name: 'modeName',
  standalone: true,
})
export class ModeNamePipe implements PipeTransform {
  constructor(private readonly translocoService: TranslocoService) {}

  public transform(value: unknown): Observable<string> {
    if (!value || typeof value !== 'string') {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.mode.button.system',
      );
    }
    if (value === Mode.Android) {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.mode.button.android',
      );
    } else if (value === Mode.Ios) {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.mode.button.ios',
      );
    } else {
      return this.translocoService.selectTranslate(
        'domain.settings.dialog.mode.button.system',
      );
    }
  }
}
