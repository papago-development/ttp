import { Injectable } from '@angular/core';
import {
  DialogService,
  FirebaseAuthenticationService,
  RouterService,
} from '@app/core';
import { ProviderId, User } from '@capacitor-firebase/authentication';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilePageService {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly translocoService: TranslocoService,
    private readonly routerService: RouterService,
  ) {}

  public get currentUser$(): Observable<User | undefined> {
    return this.firebaseAuthenticationService.currentUser$;
  }

  public async deleteProfile(): Promise<void> {
    const confirmed = await this.presentDeleteProfileAlert();
    if (confirmed) {
      try {
        await this.dialogService.presentLoading();
        await this.firebaseAuthenticationService.deleteUser();
      } finally {
        await this.dialogService.dismissLoading();
      }
      await this.navigateToLoginPage();
    }
  }

  public async navigateToSettingsPage(): Promise<void> {
    await this.routerService.navigateToSettingsPage({
      animationDirection: 'back',
    });
  }

  public async presentUnsavedChangesAlert(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      void this.dialogService.presentAlert({
        header: this.translocoService.translate(
          'core.dialog.unsavedChanges.header',
        ),
        message: this.translocoService.translate(
          'core.dialog.unsavedChanges.message',
        ),
        buttons: [
          {
            text: this.translocoService.translate(
              'core.dialog.unsavedChanges.button.cancel',
            ),
            role: 'cancel',
            handler: (): void => {
              resolve(false);
            },
          },
          {
            text: this.translocoService.translate(
              'core.dialog.unsavedChanges.button.continue',
            ),
            role: 'destructive',
            handler: (): void => {
              resolve(true);
            },
          },
        ],
      });
    });
  }

  public async sendEmailVerification(): Promise<void> {
    await this.firebaseAuthenticationService.sendEmailVerification();
  }

  public async presentEmailVerificationSentAlert(): Promise<void> {
    await this.dialogService.presentAlert({
      header: this.translocoService.translate(
        'domain.profile.dialog.emailVerificationSent.header',
      ),
      message: this.translocoService.translate(
        'domain.profile.dialog.emailVerificationSent.message',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.profile.dialog.emailVerificationSent.button.ok',
          ),
        },
      ],
    });
  }

  public async linkWithApple(): Promise<void> {
    await this.firebaseAuthenticationService.linkWithApple();
  }

  public async linkWithGoogle(): Promise<void> {
    await this.firebaseAuthenticationService.linkWithGoogle();
  }

  public async unlinkFromApple(): Promise<void> {
    await this.firebaseAuthenticationService.unlink({
      providerId: ProviderId.APPLE,
    });
  }

  public async unlinkFromGoogle(): Promise<void> {
    await this.firebaseAuthenticationService.unlink({
      providerId: ProviderId.GOOGLE,
    });
  }

  public async updateProfile(options: {
    displayName?: string;
    email?: string;
    password?: string;
  }): Promise<void> {
    const loadingElement = await this.dialogService.presentLoading();
    try {
      if (options.displayName) {
        await this.firebaseAuthenticationService.updateProfile({
          displayName: options.displayName,
        });
      }
      if (options.email) {
        await this.firebaseAuthenticationService.updateEmail({
          newEmail: options.email,
        });
      }
      if (options.password) {
        await this.firebaseAuthenticationService.updatePassword({
          newPassword: options.password,
        });
      }
    } finally {
      await loadingElement.dismiss();
    }
  }

  private async presentDeleteProfileAlert(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      void this.dialogService.presentAlert({
        header: this.translocoService.translate(
          'domain.profile.dialog.delete.header',
        ),
        message: this.translocoService.translate(
          'domain.profile.dialog.delete.message',
        ),
        buttons: [
          {
            text: this.translocoService.translate(
              'domain.profile.dialog.delete.button.cancel',
            ),
            role: 'cancel',
            handler: (): void => {
              resolve(false);
            },
          },
          {
            text: this.translocoService.translate(
              'domain.profile.dialog.delete.button.delete',
            ),
            role: 'destructive',
            handler: (): void => {
              resolve(true);
            },
          },
        ],
      });
    });
  }

  private async navigateToLoginPage(): Promise<void> {
    await this.routerService.navigateToLoginPage();
  }
}
