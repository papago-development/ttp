import { Injectable } from '@angular/core';
import {
  FirebaseCrashlytics,
  SetUserIdOptions,
} from '@capacitor-firebase/crashlytics';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFirebaseCrashlyticsService {
  constructor() {}

  public async setUserId(options: SetUserIdOptions): Promise<void> {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    return FirebaseCrashlytics.setUserId(options);
  }
}
