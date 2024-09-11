import { Injectable } from '@angular/core';
import {
  GetBooleanOptions,
  GetBooleanResult,
  GetNumberOptions,
  GetNumberResult,
  GetStringOptions,
  GetStringResult,
} from '@capacitor-firebase/remote-config';
import { environment } from '@env/environment';
import { CapacitorFirebaseRemoteConfigService } from '../../capacitor';
import { PlatformService } from '../../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRemoteConfigService {
  constructor(
    private readonly capacitorFirebaseRemoteConfigService: CapacitorFirebaseRemoteConfigService,
    private readonly platformService: PlatformService,
  ) {}

  public async fetchAndActivate(): Promise<void> {
    if (!environment.production && this.platformService.isWeb()) {
      await this.capacitorFirebaseRemoteConfigService.setMinimumFetchInterval({
        minimumFetchIntervalInSeconds: 0,
      });
    }
    return this.capacitorFirebaseRemoteConfigService.fetchAndActivate();
  }

  public async getBoolean(
    options: GetBooleanOptions,
  ): Promise<GetBooleanResult> {
    return this.capacitorFirebaseRemoteConfigService.getBoolean(options);
  }

  public async getNumber(options: GetNumberOptions): Promise<GetNumberResult> {
    return this.capacitorFirebaseRemoteConfigService.getNumber(options);
  }

  public async getString(options: GetStringOptions): Promise<GetStringResult> {
    return this.capacitorFirebaseRemoteConfigService.getString(options);
  }
}
