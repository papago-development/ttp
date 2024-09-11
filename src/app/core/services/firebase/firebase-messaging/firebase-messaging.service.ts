import { Injectable } from '@angular/core';
import {
  GetTokenOptions,
  GetTokenResult,
  IsSupportedResult,
  PermissionStatus,
  TokenReceivedEvent,
} from '@capacitor-firebase/messaging';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CapacitorFirebaseMessagingService } from '../../capacitor';
import { PlatformService } from '../../platform/platform.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  constructor(
    private readonly capacitorFirebaseMessagingService: CapacitorFirebaseMessagingService,
    private readonly platformService: PlatformService,
  ) {}

  public get permissionStatus$(): Observable<PermissionStatus> {
    return this.capacitorFirebaseMessagingService.permissionStatus$;
  }

  public get tokenReceived$(): Observable<TokenReceivedEvent> {
    return this.capacitorFirebaseMessagingService.tokenReceived$;
  }

  public isSupported(): Promise<IsSupportedResult> {
    return this.capacitorFirebaseMessagingService.isSupported();
  }

  public checkPermissions(): Promise<PermissionStatus> {
    return this.capacitorFirebaseMessagingService.checkPermissions();
  }

  public requestPermissions(): Promise<PermissionStatus> {
    return this.capacitorFirebaseMessagingService.requestPermissions();
  }

  public async getToken(): Promise<GetTokenResult> {
    const options: GetTokenOptions = {
      vapidKey: environment.firebase.vapidKey,
    };
    if (this.platformService.isWeb()) {
      options.serviceWorkerRegistration =
        await navigator.serviceWorker.register('firebase-messaging-sw.js');
    }
    return this.capacitorFirebaseMessagingService.getToken(options);
  }
}
