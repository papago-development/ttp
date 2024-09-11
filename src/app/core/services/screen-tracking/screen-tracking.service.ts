import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FirebaseAnalyticsService } from '../firebase';

@Injectable({
  providedIn: 'root',
})
export class ScreenTrackingService {
  private initialized = false;

  constructor(
    private readonly router: Router,
    private readonly firebaseAnalyticsService: FirebaseAnalyticsService,
  ) {}

  public initialize(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        void this.trackScreen(event.urlAfterRedirects);
      }
    });
  }

  private async trackScreen(url: string): Promise<void> {
    const path = url.split('?')[0];
    await this.firebaseAnalyticsService.setCurrentScreen({ screenName: path });
  }
}
