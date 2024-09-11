import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { environment } from '@env/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAppService {
  private firebaseApp: FirebaseApp | undefined;

  constructor() {}

  public initialize(): void {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    if (this.firebaseApp) {
      return;
    }
    this.firebaseApp = initializeApp(environment.firebase);
  }

  public getFirebaseApp(): FirebaseApp | undefined {
    return this.firebaseApp;
  }
}
