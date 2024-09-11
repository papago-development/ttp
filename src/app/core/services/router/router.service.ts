import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/common/providers/nav-controller';
import { CapacitorAppService } from '../capacitor';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private initialized = false;

  constructor(
    private readonly capacitorAppService: CapacitorAppService,
    private readonly navController: NavController,
  ) {}

  public initialize(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.capacitorAppService.backButton$.subscribe(event => {
      if (event.canGoBack) {
        window.history.back();
      } else {
        void App.exitApp();
      }
    });
  }

  public navigateToLoginPage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/login'], options);
  }

  public navigateToRootPage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/'], options);
  }

  public navigateToRegisterPage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/register'], options);
  }

  public navigateToForgotPasswordPage(
    options?: NavigationOptions,
  ): Promise<boolean> {
    return this.navigateForward(['/forgot-password'], options);
  }

  public navigateToHomePage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/home'], options);
  }

  public navigateToTaskListPage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/tasks'], options);
  }

  public async navigateToTaskUpsertPage(
    taskId?: string,
    options?: NavigationOptions,
  ): Promise<boolean> {
    if (taskId) {
      return this.navigateForward(['tasks', taskId], options);
    } else {
      return this.navigateForward(['tasks', 'create'], options);
    }
  }

  public navigateToSettingsPage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/settings'], options);
  }

  public navigateToProfilePage(options?: NavigationOptions): Promise<boolean> {
    return this.navigateForward(['/profile'], options);
  }

  private navigateForward(
    commands: any[] | string | any,
    options?: NavigationOptions,
  ): Promise<boolean> {
    return this.navController.navigateForward(commands, options);
  }
}
