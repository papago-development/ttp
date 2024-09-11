import { Injectable } from '@angular/core';
import { FirebaseRemoteConfigService } from '../firebase';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private initialized = false;
  private fetchAndActivatePromise: Promise<void> | undefined;

  constructor(
    private readonly firebaseRemoteConfigService: FirebaseRemoteConfigService,
  ) {}

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.fetchAndActivatePromise =
      this.firebaseRemoteConfigService.fetchAndActivate();
    await this.fetchAndActivatePromise;
  }

  public async getBoolean(key: string): Promise<boolean> {
    try {
      await this.fetchAndActivatePromise;
      const result = await this.firebaseRemoteConfigService.getBoolean({
        key,
      });
      return result.value;
    } catch {
      return false;
    }
  }

  public async getNumber(key: string): Promise<number> {
    try {
      await this.fetchAndActivatePromise;
      const result = await this.firebaseRemoteConfigService.getNumber({
        key,
      });
      return result.value;
    } catch {
      return 0;
    }
  }

  public async getString(key: string): Promise<string> {
    try {
      await this.fetchAndActivatePromise;
      const result = await this.firebaseRemoteConfigService.getString({
        key,
      });
      return result.value;
    } catch {
      return '';
    }
  }
}
