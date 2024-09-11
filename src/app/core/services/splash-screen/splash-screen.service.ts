import { Injectable } from '@angular/core';
import { CapacitorSplashScreenService } from '../capacitor';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenService {
  constructor(
    private readonly capacitorSplashScreenService: CapacitorSplashScreenService,
  ) {}

  public hide(): Promise<void> {
    return this.capacitorSplashScreenService.hide();
  }

  public show(): Promise<void> {
    return this.capacitorSplashScreenService.show();
  }
}
