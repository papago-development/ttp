import { Injectable } from '@angular/core';
import {
  FirebaseRemoteConfig,
  GetBooleanOptions,
  GetBooleanResult,
  GetNumberOptions,
  GetNumberResult,
  GetStringOptions,
  GetStringResult,
  SetMinimumFetchIntervalOptions,
} from '@capacitor-firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFirebaseRemoteConfigService {
  constructor() {}

  public fetchAndActivate(): Promise<void> {
    return FirebaseRemoteConfig.fetchAndActivate();
  }

  public getBoolean(options: GetBooleanOptions): Promise<GetBooleanResult> {
    return FirebaseRemoteConfig.getBoolean(options);
  }

  public getNumber(options: GetNumberOptions): Promise<GetNumberResult> {
    return FirebaseRemoteConfig.getNumber(options);
  }

  public getString(options: GetStringOptions): Promise<GetStringResult> {
    return FirebaseRemoteConfig.getString(options);
  }

  public setMinimumFetchInterval(
    options: SetMinimumFetchIntervalOptions,
  ): Promise<void> {
    return FirebaseRemoteConfig.setMinimumFetchInterval(options);
  }
}
