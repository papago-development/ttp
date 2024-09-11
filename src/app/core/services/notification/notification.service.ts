import { Injectable } from '@angular/core';
import { User } from '@capacitor-firebase/authentication';
import {
  PermissionStatus,
  TokenReceivedEvent,
} from '@capacitor-firebase/messaging';
import { Observable } from 'rxjs';
import {
  FirebaseAuthenticationService,
  FirebaseFirestoreService,
  FirebaseMessagingService,
} from '../firebase';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private initialized = false;

  constructor(
    private readonly firebaseMessagingService: FirebaseMessagingService,
    private readonly firebaseFirestoreService: FirebaseFirestoreService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
  ) {}

  public get permissionStatus$(): Observable<PermissionStatus> {
    return this.firebaseMessagingService.permissionStatus$;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const isSupported = await this.isSupported();
    if (!isSupported) {
      return;
    }
    this.firebaseAuthenticationService.currentUser$.subscribe(
      user => void this.handleCurrentUserChange(user),
    );
    this.firebaseMessagingService.tokenReceived$.subscribe(
      event => void this.handleTokenReceivedEvent(event),
    );
  }

  public async isSupported(): Promise<boolean> {
    const { isSupported } = await this.firebaseMessagingService.isSupported();
    return isSupported;
  }

  public checkPermissions(): Promise<PermissionStatus> {
    return this.firebaseMessagingService.checkPermissions();
  }

  public requestPermissions(): Promise<PermissionStatus> {
    return this.firebaseMessagingService.requestPermissions();
  }

  private async handleCurrentUserChange(user: User | undefined): Promise<void> {
    if (!user) {
      return;
    }
    const { receive } = await this.firebaseMessagingService.checkPermissions();
    if (receive === 'granted') {
      const { token } = await this.firebaseMessagingService.getToken();
      await this.handleTokenReceivedEvent({ token });
    }
  }

  private async handleTokenReceivedEvent(
    event: TokenReceivedEvent,
  ): Promise<void> {
    const user = await this.firebaseAuthenticationService.getCurrentUser();
    if (!user?.uid) {
      return;
    }
    const { snapshots } = await this.firebaseFirestoreService.getCollection({
      reference: `users/${user.uid}/fcmTokens`,
      compositeFilter: {
        type: 'and',
        queryConstraints: [
          {
            type: 'where',
            fieldPath: 'token',
            opStr: '==',
            value: event.token,
          },
        ],
      },
    });
    if (snapshots.length === 0) {
      await this.firebaseFirestoreService.addDocument({
        reference: `users/${user.uid}/fcmTokens`,
        data: {
          token: event.token,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    } else {
      await this.firebaseFirestoreService.setDocument({
        reference: `users/${user.uid}/fcmTokens/${snapshots[0].id}`,
        data: {
          token: event.token,
          timestamp: new Date().toISOString(),
        },
      });
    }
  }
}
