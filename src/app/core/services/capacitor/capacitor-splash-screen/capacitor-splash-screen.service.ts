import { Injectable } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root',
})
export class CapacitorSplashScreenService {
  constructor() {}

  public hide(): Promise<void> {
    return SplashScreen.hide();
  }

  public show(): Promise<void> {
    return SplashScreen.show();
  }
}
