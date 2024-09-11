import { Injectable, NgZone } from '@angular/core';
import { PlatformService } from '@app/core/services/platform/platform.service';
import {
  FirebaseMessaging,
  GetTokenOptions,
  GetTokenResult,
  IsSupportedResult,
  PermissionStatus,
  TokenReceivedEvent,
} from '@capacitor-firebase/messaging';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFirebaseMessagingService {
  public readonly permissionStatus$: Observable<PermissionStatus>;

  private readonly permissionStatusSubject =
    new ReplaySubject<PermissionStatus>(1);
  private readonly tokenReceivedSubject = new ReplaySubject<TokenReceivedEvent>(
    1,
  );

  constructor(
    private readonly ngZone: NgZone,
    private readonly platformService: PlatformService,
  ) {
    this.permissionStatus$ = this.createPermissionStatusObservable();
    void this.removeAllListeners().then(() => {
      void FirebaseMessaging.addListener('tokenReceived', event => {
        this.ngZone.run(() => {
          this.tokenReceivedSubject.next(event);
        });
      });
    });
  }

  public get tokenReceived$(): Observable<TokenReceivedEvent> {
    return this.tokenReceivedSubject.asObservable();
  }

  public isSupported(): Promise<IsSupportedResult> {
    return FirebaseMessaging.isSupported();
  }

  public async checkPermissions(): Promise<PermissionStatus> {
    if (this.platformService.isWeb()) {
      /**
       * Check the permission only if the API is supported.
       * Otherwise, the following error may occur: `Prevent the error: `Can't find variable: Notification``
       */
      const { isSupported } = await this.isSupported();
      if (!isSupported) {
        return {
          receive: 'denied',
        };
      }
    }
    const result = await FirebaseMessaging.checkPermissions();
    this.permissionStatusSubject.next(result);
    return result;
  }

  public async requestPermissions(): Promise<PermissionStatus> {
    if (this.platformService.isWeb()) {
      /**
       * Check the permission only if the API is supported.
       * Otherwise, the following error may occur: `Prevent the error: `Can't find variable: Notification``
       */
      const { isSupported } = await this.isSupported();
      if (!isSupported) {
        return {
          receive: 'denied',
        };
      }
    }
    const result = await FirebaseMessaging.requestPermissions();
    this.permissionStatusSubject.next(result);
    return result;
  }

  public getToken(options?: GetTokenOptions): Promise<GetTokenResult> {
    return FirebaseMessaging.getToken(options);
  }

  public async removeAllListeners(): Promise<void> {
    await FirebaseMessaging.removeAllListeners();
  }

  private createPermissionStatusObservable(): Observable<PermissionStatus> {
    return new Observable<PermissionStatus>(subscriber => {
      void this.checkPermissions().then(permissionStatus => {
        subscriber.next(permissionStatus);
      });
      return this.permissionStatusSubject.subscribe(subscriber);
    });
  }
}
