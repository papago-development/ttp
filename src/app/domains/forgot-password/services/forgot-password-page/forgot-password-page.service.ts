import { Injectable } from '@angular/core';
import { DialogService, FirebaseAuthenticationService } from '@app/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordPageService {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
    private readonly translocoService: TranslocoService,
  ) {}

  public async confirmPasswordReset(
    oobCode: string,
    newPassword: string,
  ): Promise<void> {
    await this.firebaseAuthenticationService.confirmPasswordReset({
      oobCode,
      newPassword,
    });
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    await this.firebaseAuthenticationService.sendPasswordResetEmail({ email });
  }

  public async presentEmailSentDialog(): Promise<void> {
    await this.dialogService.presentAlert({
      header: this.translocoService.translate(
        'domain.forgotPassword.dialog.email.header',
      ),
      message: this.translocoService.translate(
        'domain.forgotPassword.dialog.email.message',
      ),
      buttons: [
        this.translocoService.translate(
          'domain.forgotPassword.dialog.email.button.ok',
        ),
      ],
    });
  }
}
