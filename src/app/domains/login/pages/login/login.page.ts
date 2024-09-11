import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@app/shared';
import {
  ConfigurationValueBooleanPipe,
  ConfigurationValueStringPipe,
  OpenUrlDirective,
} from '@app/widgets';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { LoginPageService } from '../../services';

export const loginPageSelector = 'app-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    TranslocoPipe,
    ConfigurationValueBooleanPipe,
    ConfigurationValueStringPipe,
    OpenUrlDirective,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonInput,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly loginPageService: LoginPageService) {}

  public ngOnInit(): void {
    void this.loginPageService.checkRedirectResult();
  }

  public async onSignInAnonymously(): Promise<void> {
    await this.loginPageService.signInAnonymously();
  }

  public async onSignInWithEmailAndPassword(): Promise<void> {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (!email || !password) {
      return;
    }
    await this.loginPageService.signInWithEmailAndPassword(email, password);
  }

  public async onSignInWithApple(): Promise<void> {
    await this.loginPageService.signInWithApple();
  }

  public async onSignInWithGoogle(): Promise<void> {
    await this.loginPageService.signInWithGoogle();
  }

  public async onNavigateToForgotPasswordPage(): Promise<void> {
    await this.loginPageService.navigateToForgotPasswordPage();
  }

  public async onNavigateToRegisterPage(): Promise<void> {
    await this.loginPageService.navigateToRegisterPage();
  }
}
