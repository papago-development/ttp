import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { ConfigurationValueStringPipe, OpenUrlDirective } from '@app/widgets';
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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { RegisterPageService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    TranslocoPipe,
    OpenUrlDirective,
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
    ConfigurationValueStringPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly registerPageService: RegisterPageService) {}

  public async onCreateUserWithEmailAndPassword(): Promise<void> {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (!email || !password) {
      return;
    }
    await this.registerPageService.createUserWithEmailAndPassword(
      email,
      password,
    );
  }
}
