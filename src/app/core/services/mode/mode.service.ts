import { Injectable } from '@angular/core';
import { Mode, SettingsRepository } from '@app/store';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  public readonly mode$ = this.settingsRepository.mode$;

  constructor(private readonly settingsRepository: SettingsRepository) {
    settingsRepository.initialized$.subscribe(() => {
      const mode = this.getMode();
      if (mode) {
        this.setMode(mode);
      }
    });
  }

  public setMode(mode: Mode): void {
    this.settingsRepository.setMode(mode);
    const config: any =
      window && (window as any).Ionic && (window as any).Ionic.config;
    if (config) {
      config.set('mode', mode === Mode.System ? undefined : mode);
    }
  }

  public getMode(): Mode | undefined {
    return this.settingsRepository.getMode();
  }
}
