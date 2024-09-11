import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Mode as IonicMode } from '@ionic/core';
import { createState, select, Store, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

export interface SettingsProperties {
  mode: Mode;
  theme: Theme;
}

export enum Mode {
  System = 'system',
  Android = 'android',
  Ios = 'ios',
}

export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

const { state, config } = createState(
  withProps<SettingsProperties>({
    mode: Mode.System,
    theme: Theme.Light,
  }),
);
const store = new Store({ name: 'settings', state, config });

const persistStateInstance = persistState(store, {
  key: environment.localStorageKeyPrefix + 'settings',
  /**
   * This must be set to `localStorageStrategy` so that the AppModule
   * can synchronously load the `mode` from memory when the app is started.
   *
   * You can change this to `capacitorStateStorage` if you don't want
   * to change the mode at runtime.
   */
  storage: localStorageStrategy,
});

export const getModeForIonicModule = (): IonicMode | undefined => {
  const { mode } = store.getValue();
  switch (mode) {
    case Mode.Android: {
      return 'md';
    }
    case Mode.Ios: {
      return 'ios';
    }
    default: {
      return;
    }
  }
};

@Injectable({ providedIn: 'root' })
export class SettingsRepository {
  public initialized$ = persistStateInstance.initialized$;
  public theme$ = store.pipe(select(state => state.theme));
  public mode$ = store.pipe(select(state => state.mode));

  public setMode(mode: SettingsProperties['mode']): void {
    store.update(state => ({
      ...state,
      mode,
    }));
  }

  public getMode(): SettingsProperties['mode'] {
    const { mode } = store.getValue();
    return mode;
  }

  public setTheme(theme: SettingsProperties['theme']): void {
    store.update(state => ({
      ...state,
      theme,
    }));
  }

  public getTheme(): SettingsProperties['theme'] {
    const { theme } = store.getValue();
    return theme;
  }

  public clear(): void {
    this.setMode(Mode.System);
    this.setTheme(Theme.System);
  }
}
