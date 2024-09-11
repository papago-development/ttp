import { Injectable } from '@angular/core';
import {
  DialogService,
  FirebaseAuthenticationService,
  LiveUpdateService,
  ModeService,
  NotificationService,
  PlatformService,
  RouterService,
  ThemeService,
} from '@app/core';
import { Mode, Theme } from '@app/store';
import { User } from '@capacitor-firebase/authentication';
import { PermissionStatus } from '@capacitor-firebase/messaging';
import { environment } from '@env/environment';
import { TranslocoService } from '@jsverse/transloco';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsPageService {
  constructor(
    private readonly routerService: RouterService,
    private readonly themeService: ThemeService,
    private readonly modeService: ModeService,
    private readonly dialogService: DialogService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly translocoService: TranslocoService,
    private readonly notificationService: NotificationService,
    private readonly platformService: PlatformService,
    private readonly liveUpdateService: LiveUpdateService,
  ) {}

  public get currentUser$(): Observable<User | undefined> {
    return this.firebaseAuthenticationService.currentUser$;
  }

  public get isNative$(): Observable<boolean> {
    return this.platformService.isNative$;
  }

  public get isNotificationSupported$(): Observable<boolean> {
    return from(this.notificationService.isSupported());
  }

  public get isUpdateAvailable$(): Observable<boolean> {
    return this.liveUpdateService.isUpdateAvailable$;
  }

  public get language$(): Observable<string> {
    return this.translocoService.langChanges$;
  }

  public get mode$(): Observable<Mode | undefined> {
    return this.modeService.mode$;
  }

  public get notificationPermissionStatus$(): Observable<PermissionStatus> {
    return this.notificationService.permissionStatus$;
  }

  public get theme$(): Observable<Theme | undefined> {
    return this.themeService.theme$;
  }

  public async navigateToProfilePage(): Promise<void> {
    await this.routerService.navigateToProfilePage();
  }

  public async presentLanguageActionSheet(): Promise<void> {
    await this.dialogService.presentActionSheet({
      header: this.translocoService.translate(
        'domain.settings.dialog.language.header',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.language.button.en',
          ),
          handler: (): void => {
            this.translocoService.setActiveLang('en');
          },
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.language.button.de',
          ),
          handler: (): void => {
            this.translocoService.setActiveLang('de');
          },
        },
      ],
    });
  }

  public async presentModeActionSheet(): Promise<void> {
    await this.dialogService.presentActionSheet({
      header: this.translocoService.translate(
        'domain.settings.dialog.mode.header',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.mode.button.system',
          ),
          handler: (): void => {
            this.setMode(Mode.System);
          },
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.mode.button.android',
          ),
          handler: (): void => {
            this.setMode(Mode.Android);
          },
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.mode.button.ios',
          ),
          handler: (): void => {
            this.setMode(Mode.Ios);
          },
        },
      ],
    });
  }

  public async presentSignOutAlert(): Promise<void> {
    const alertElement = await this.dialogService.presentAlert({
      header: this.translocoService.translate(
        'domain.settings.dialog.logout.header',
      ),
      message: this.translocoService.translate(
        'domain.settings.dialog.logout.message',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.logout.button.cancel',
          ),
          role: 'cancel',
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.logout.button.logout',
          ),
          role: 'destructive',
          handler: async (): Promise<void> => {
            await alertElement.dismiss();
            const loadingElement = await this.dialogService.presentLoading();
            try {
              await this.firebaseAuthenticationService.signOut();
            } finally {
              await loadingElement.dismiss();
            }
            await this.routerService.navigateToLoginPage({
              replaceUrl: true,
            });
          },
        },
      ],
    });
  }

  public async presentThemeActionSheet(): Promise<void> {
    await this.dialogService.presentActionSheet({
      header: this.translocoService.translate(
        'domain.settings.dialog.theme.header',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.theme.button.system',
          ),
          handler: (): void => {
            this.setTheme(Theme.System);
          },
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.theme.button.light',
          ),
          handler: (): void => {
            this.setTheme(Theme.Light);
          },
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.theme.button.dark',
          ),
          handler: (): void => {
            this.setTheme(Theme.Dark);
          },
        },
      ],
    });
  }

  public async presentUpdateAvailableAlert(): Promise<void> {
    await this.dialogService.presentAlert({
      header: this.translocoService.translate(
        'domain.settings.dialog.updateAvailable.header',
      ),
      message: this.translocoService.translate(
        'domain.settings.dialog.updateAvailable.message',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.updateAvailable.button.cancel',
          ),
          role: 'cancel',
        },
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.updateAvailable.button.restart',
          ),
          handler: (): void => {
            void this.liveUpdateService.reload();
          },
        },
      ],
    });
  }

  public async presentVersionActionSheet(): Promise<void> {
    const isNative = this.platformService.isNative();
    if (!isNative) {
      return;
    }
    await this.dialogService.presentActionSheet({
      header: this.translocoService.translate(
        'domain.settings.dialog.version.header',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.version.button.update',
          ),
          handler: (): void => {
            void this.checkForUpdate();
          },
        },
      ],
    });
  }

  public async requestNotificationPermissions(): Promise<void> {
    await this.notificationService.requestPermissions();
  }

  public async submitFeedback(email: string): Promise<void> {
    const subject = this.translocoService.translate(
      'domain.settings.dialog.feedback.subject',
    );
    const body1 = this.translocoService.translate(
      'domain.settings.dialog.feedback.body1',
    );
    const body2 = this.translocoService.translate(
      'domain.settings.dialog.feedback.body2',
    );
    const version = `${environment.version.major}.${environment.version.minor}.${environment.version.patch}`;
    const changeset = environment.build.changeset;
    const userId = await this.firebaseAuthenticationService.getCurrentUserId();
    const language = this.translocoService.getActiveLang();
    const platform = this.platformService.getPlatform();

    window.location.href = `mailto:${email}?subject=${subject}&body=${body1}%0D%0A
      %0D%0A
version: ${version}%0D%0A
changeset: ${changeset}%0D%0A
userId: ${userId}%0D%0A
language: ${language}%0D%0A
platform: ${platform}%0D%0A
%0D%0A
${body2}%0D%0A%0D%0A`;
  }

  private async checkForUpdate(): Promise<void> {
    const loadingElement = await this.dialogService.presentLoading();
    try {
      const syncResult = await this.liveUpdateService.sync();
      if (syncResult.nextBundleId) {
        await this.presentUpdateAvailableAlert();
      } else {
        await this.presentUpdateNotAvailableToast();
      }
    } finally {
      await loadingElement.dismiss();
    }
  }

  private async presentUpdateNotAvailableToast(): Promise<void> {
    await this.dialogService.presentToast({
      message: this.translocoService.translate(
        'domain.settings.dialog.updateNotAvailable.message',
      ),
    });
  }

  private setMode(mode: Mode): void {
    this.modeService.setMode(mode);
    void this.dialogService.presentToast({
      duration: 5000,
      message: this.translocoService.translate(
        'domain.settings.dialog.reload.message',
      ),
      buttons: [
        {
          text: this.translocoService.translate(
            'domain.settings.dialog.reload.button.reload',
          ),
          handler: (): void => {
            window.location.reload();
          },
        },
      ],
    });
  }

  private setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
