import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeactivationGuard } from '@app/core';
import { SharedModule } from '@app/shared';
import { ConfigurationValueBooleanPipe } from '@app/widgets';
import { ProviderId } from '@capacitor-firebase/authentication';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { IsUserLinkedWithPipe } from '../../pipes';
import { ProfilePageService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    TranslocoPipe,
    IsUserLinkedWithPipe,
    ConfigurationValueBooleanPipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonButton,
    IonSpinner,
    IonList,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit, DeactivationGuard {
  public readonly currentUser$ = this.profilePageService.currentUser$;
  public readonly form = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    password: new FormControl(''),
    appleEmail: new FormControl(''),
    googleEmail: new FormControl(''),
  });
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly profilePageService: ProfilePageService) {}

  public ngOnInit(): void {
    this.currentUser$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.form.patchValue({
          displayName: user?.displayName,
          email: user?.email,
          appleEmail: user?.providerData.find(
            provider => provider.providerId === ProviderId.APPLE,
          )?.email,
          googleEmail: user?.providerData.find(
            provider => provider.providerId === ProviderId.GOOGLE,
          )?.email,
        });
      });
  }

  public async canDeactivate(): Promise<boolean> {
    if (!this.form.dirty) {
      return true;
    }
    return this.profilePageService.presentUnsavedChangesAlert();
  }

  public async onSendEmailVerification(): Promise<void> {
    await this.profilePageService.sendEmailVerification();
    await this.profilePageService.presentEmailVerificationSentAlert();
  }

  public async onLinkWithApple(): Promise<void> {
    await this.profilePageService.linkWithApple();
  }

  public async onLinkWithGoogle(): Promise<void> {
    await this.profilePageService.linkWithGoogle();
  }

  public async onUnlinkFromApple(): Promise<void> {
    await this.profilePageService.unlinkFromApple();
  }

  public async onUnlinkFromGoogle(): Promise<void> {
    await this.profilePageService.unlinkFromGoogle();
  }

  public async onUpdateProfile(): Promise<void> {
    if (!this.form.valid || !this.form.dirty) {
      return;
    }
    const displayName = this.form.value.displayName ?? undefined;
    const email = this.form.value.email ?? undefined;
    const password = this.form.value.password ?? undefined;
    await this.profilePageService.updateProfile({
      displayName,
      email,
      password,
    });
    this.form.markAsPristine();
    await this.profilePageService.navigateToSettingsPage();
  }

  public async onDeleteProfile(): Promise<void> {
    await this.profilePageService.deleteProfile();
  }
}
