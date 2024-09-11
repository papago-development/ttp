import { Injectable } from '@angular/core';
import {
  FirebaseAnalytics,
  SetCurrentScreenOptions,
} from '@capacitor-firebase/analytics';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFirebaseAnalyticsService {
  constructor() {}

  public setCurrentScreen(options: SetCurrentScreenOptions): Promise<void> {
    return FirebaseAnalytics.setCurrentScreen(options);
  }
}
