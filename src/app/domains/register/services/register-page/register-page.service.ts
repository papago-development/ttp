import { Injectable } from '@angular/core';
import { FirebaseAuthenticationService, RouterService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterPageService {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly routerService: RouterService,
  ) {}

  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    await this.firebaseAuthenticationService.createUserWithEmailAndPassword({
      email,
      password,
    });
    await this.navigateToHome();
  }

  private async navigateToHome(): Promise<void> {
    await this.routerService.navigateToRootPage({ replaceUrl: true });
  }
}
