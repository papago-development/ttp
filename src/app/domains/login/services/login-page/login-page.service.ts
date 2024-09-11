import { Injectable } from '@angular/core';
import {
  DialogService,
  FirebaseAuthenticationService,
  RouterService,
} from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  constructor(
    private readonly routerService: RouterService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly dialogService: DialogService,
  ) {}

  public async checkRedirectResult(): Promise<void> {
    const result = await this.firebaseAuthenticationService.getRedirectResult();
    if (result?.user) {
      await this.navigateToHomePage();
    }
  }

  public async signInAnonymously(): Promise<void> {
    const loadingElement = await this.dialogService.presentLoading();
    try {
      await this.firebaseAuthenticationService.signInAnonymously();
    } finally {
      await loadingElement.dismiss();
    }
    await this.navigateToHomePage();
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    const loadingElement = await this.dialogService.presentLoading();
    try {
      await this.firebaseAuthenticationService.signInWithEmailAndPassword({
        email,
        password,
      });
    } finally {
      await loadingElement.dismiss();
    }
    await this.navigateToHomePage();
  }

  public async signInWithApple(): Promise<void> {
    const loadingElement = await this.dialogService.presentLoading();
    try {
      await this.firebaseAuthenticationService.signInWithApple();
    } finally {
      await loadingElement.dismiss();
    }
    await this.navigateToHomePage();
  }

  public async signInWithGoogle(): Promise<void> {
    const loadingElement = await this.dialogService.presentLoading();
    try {
      await this.firebaseAuthenticationService.signInWithGoogle();
    } finally {
      await loadingElement.dismiss();
    }
    await this.navigateToHomePage();
  }

  public async navigateToForgotPasswordPage(): Promise<void> {
    await this.routerService.navigateToForgotPasswordPage();
  }

  public async navigateToRegisterPage(): Promise<void> {
    await this.routerService.navigateToRegisterPage();
  }

  private async navigateToHomePage(): Promise<void> {
    await this.routerService.navigateToRootPage({ replaceUrl: true });
  }
}
