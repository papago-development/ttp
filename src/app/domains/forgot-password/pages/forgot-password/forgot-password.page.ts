import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@app/shared';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { ForgotPasswordPageService } from '../../services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    TranslocoPipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public oobCode: string | undefined;

  constructor(
    private readonly forgotPasswordPageService: ForgotPasswordPageService,
  ) {}

  public async onSendPasswordResetEmail(): Promise<void> {
    if (!this.form.valid || !this.form.value.email) {
      return;
    }
    await this.forgotPasswordPageService.sendPasswordResetEmail(
      this.form.value.email,
    );
    await this.forgotPasswordPageService.presentEmailSentDialog();
    this.form.reset();
  }
}
