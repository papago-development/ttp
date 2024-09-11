import { Injectable } from '@angular/core';
import {
  AuthStateChange,
  ConfirmPasswordResetOptions,
  CreateUserWithEmailAndPasswordOptions,
  GetIdTokenOptions,
  GetIdTokenResult,
  LinkResult,
  LinkWithEmailAndPasswordOptions,
  SendPasswordResetEmailOptions,
  SignInResult,
  SignInWithEmailAndPasswordOptions,
  UnlinkOptions,
  UnlinkResult,
  UpdateEmailOptions,
  UpdatePasswordOptions,
  UpdateProfileOptions,
  User,
} from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { Observable, ReplaySubject, lastValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  CapacitorFirebaseAuthenticationService,
  CapacitorFirebaseCrashlyticsService,
} from '../../capacitor';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  private readonly currentUserSubject = new ReplaySubject<User | undefined>(1);

  constructor(
    private readonly capacitorFirebaseAuthenticationService: CapacitorFirebaseAuthenticationService,
    private readonly capacitorFirebaseCrashlyticsService: CapacitorFirebaseCrashlyticsService,
  ) {
    this.capacitorFirebaseAuthenticationService.authStateChange$.subscribe(
      event => {
        this.currentUserSubject.next(event.user || undefined);
        void this.setFirebaseCrashlyticsUserId(event.user?.uid);
      },
    );
  }

  public get authStateChange$(): Observable<AuthStateChange> {
    return this.capacitorFirebaseAuthenticationService.authStateChange$;
  }

  public get currentUser$(): Observable<User | undefined> {
    return this.currentUserSubject.asObservable();
  }

  public get currentUserId$(): Observable<string | undefined> {
    return this.currentUser$.pipe(map(user => user?.uid));
  }

  public async confirmPasswordReset(
    options: ConfirmPasswordResetOptions,
  ): Promise<void> {
    await this.capacitorFirebaseAuthenticationService.confirmPasswordReset(
      options,
    );
  }

  public async createUserWithEmailAndPassword(
    options: CreateUserWithEmailAndPasswordOptions,
  ): Promise<void> {
    await this.capacitorFirebaseAuthenticationService.createUserWithEmailAndPassword(
      options,
    );
  }

  public getCurrentUser(): Promise<User | undefined> {
    return lastValueFrom(this.currentUser$.pipe(take(1)));
  }

  public getCurrentUserId(): Promise<string | undefined> {
    return lastValueFrom(this.currentUserId$.pipe(take(1)));
  }

  public async getRedirectResult(): Promise<SignInResult | undefined> {
    if (Capacitor.isNativePlatform()) {
      return;
    }
    return this.capacitorFirebaseAuthenticationService.getRedirectResult();
  }

  public sendEmailVerification(): Promise<void> {
    return this.capacitorFirebaseAuthenticationService.sendEmailVerification();
  }

  public sendPasswordResetEmail(
    options: SendPasswordResetEmailOptions,
  ): Promise<void> {
    return this.capacitorFirebaseAuthenticationService.sendPasswordResetEmail(
      options,
    );
  }

  public signInAnonymously(): Promise<SignInResult> {
    return this.capacitorFirebaseAuthenticationService.signInAnonymously();
  }

  public signInWithEmailAndPassword(
    options: SignInWithEmailAndPasswordOptions,
  ): Promise<SignInResult> {
    return this.capacitorFirebaseAuthenticationService.signInWithEmailAndPassword(
      options,
    );
  }

  public signInWithApple(): Promise<SignInResult | undefined> {
    return this.capacitorFirebaseAuthenticationService.signInWithApple();
  }

  public signInWithGoogle(): Promise<SignInResult | undefined> {
    return this.capacitorFirebaseAuthenticationService.signInWithGoogle();
  }

  public async linkWithEmailAndPassword(
    options: LinkWithEmailAndPasswordOptions,
  ): Promise<LinkResult> {
    const result =
      await this.capacitorFirebaseAuthenticationService.linkWithEmailAndPassword(
        options,
      );
    this.currentUserSubject.next(result.user || undefined);
    return result;
  }

  public async linkWithApple(): Promise<LinkResult | undefined> {
    const result =
      await this.capacitorFirebaseAuthenticationService.linkWithApple();
    if (result) {
      this.currentUserSubject.next(result.user || undefined);
    }
    return result;
  }

  public async linkWithGoogle(): Promise<LinkResult | undefined> {
    const result =
      await this.capacitorFirebaseAuthenticationService.linkWithGoogle();
    if (result) {
      this.currentUserSubject.next(result.user || undefined);
    }
    return result;
  }

  public async unlink(options: UnlinkOptions): Promise<UnlinkResult> {
    const result =
      await this.capacitorFirebaseAuthenticationService.unlink(options);
    this.currentUserSubject.next(result.user || undefined);
    return result;
  }

  public signOut(): Promise<void> {
    return this.capacitorFirebaseAuthenticationService.signOut();
  }

  public getIdToken(options: GetIdTokenOptions): Promise<GetIdTokenResult> {
    return this.capacitorFirebaseAuthenticationService.getIdToken(options);
  }

  public async updateProfile(options: UpdateProfileOptions): Promise<void> {
    await this.capacitorFirebaseAuthenticationService.updateProfile(options);
    const result =
      await this.capacitorFirebaseAuthenticationService.getCurrentUser();
    this.currentUserSubject.next(result.user || undefined);
  }

  public async updateEmail(email: UpdateEmailOptions): Promise<void> {
    await this.capacitorFirebaseAuthenticationService.updateEmail(email);
    const result =
      await this.capacitorFirebaseAuthenticationService.getCurrentUser();
    this.currentUserSubject.next(result.user || undefined);
  }

  public async updatePassword(options: UpdatePasswordOptions): Promise<void> {
    await this.capacitorFirebaseAuthenticationService.updatePassword(options);
    const result =
      await this.capacitorFirebaseAuthenticationService.getCurrentUser();
    this.currentUserSubject.next(result.user || undefined);
  }

  public async deleteUser(): Promise<void> {
    await this.capacitorFirebaseAuthenticationService.deleteUser();
  }

  private setFirebaseCrashlyticsUserId(
    userId: string | undefined,
  ): Promise<void> {
    return this.capacitorFirebaseCrashlyticsService.setUserId({
      userId: userId || '',
    });
  }
}
