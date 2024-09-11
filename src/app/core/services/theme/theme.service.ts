import { Injectable } from '@angular/core';
import { SettingsRepository, Theme } from '@app/store';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly theme$ = this.settingsRepository.theme$;

  private initialized = false;

  constructor(private readonly settingsRepository: SettingsRepository) {}

  public initialize(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.settingsRepository.initialized$.subscribe(() => {
      const theme = this.getTheme();
      this.setTheme(theme);
    });
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        this.handleMediaPreferenceChange();
      });
  }

  public setTheme(theme: Theme): void {
    this.settingsRepository.setTheme(theme);
    let hasDarkPreference;
    switch (theme) {
      case Theme.Light: {
        hasDarkPreference = false;
        break;
      }
      case Theme.Dark: {
        hasDarkPreference = true;
        break;
      }
      default: {
        hasDarkPreference = this.getMediaPreference().matches;
      }
    }
    if (hasDarkPreference) {
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }

  public getTheme(): Theme {
    return this.settingsRepository.getTheme();
  }

  private getMediaPreference(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  private handleMediaPreferenceChange(): void {
    const theme = this.getTheme();
    if (theme === Theme.System) {
      this.setTheme(theme);
    }
  }
}
