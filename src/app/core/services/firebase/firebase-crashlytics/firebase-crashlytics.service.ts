import { Injectable } from '@angular/core';
import { CapacitorFirebaseCrashlyticsService } from '../../capacitor';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCrashlyticsService {
  constructor(
    private readonly capacitorFirebaseCrashlyticsService: CapacitorFirebaseCrashlyticsService,
  ) {}

  public setUserId(userId: string): Promise<void> {
    return this.capacitorFirebaseCrashlyticsService.setUserId({ userId });
  }
}
