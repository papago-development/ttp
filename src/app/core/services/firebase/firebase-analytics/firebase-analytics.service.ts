import { Injectable } from '@angular/core';
import { SetCurrentScreenOptions } from '@capacitor-firebase/analytics';
import { CapacitorFirebaseAnalyticsService } from '../../capacitor';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAnalyticsService {
  constructor(
    private readonly capacitorFirebaseAnalyticsService: CapacitorFirebaseAnalyticsService,
  ) {}

  public setCurrentScreen(options: SetCurrentScreenOptions): Promise<void> {
    return this.capacitorFirebaseAnalyticsService.setCurrentScreen(options);
  }
}
