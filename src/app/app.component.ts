import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import {
  ConfigurationService,
  FirebaseAppService,
  LiveUpdateService,
  NotificationService,
  RouterService,
  ScreenTrackingService,
  SplashScreenService,
  ThemeService,
} from '@app/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private readonly routerService: RouterService,
    private readonly themeService: ThemeService,
    private readonly screenTrackingService: ScreenTrackingService,
    private readonly firebaseAppService: FirebaseAppService,
    private readonly liveUpdateService: LiveUpdateService,
    private readonly splashScreenService: SplashScreenService,
    private readonly injector: Injector,
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.liveUpdateService.initialize();
    this.routerService.initialize();
    this.themeService.initialize();
    this.screenTrackingService.initialize();
    this.firebaseAppService.initialize();
    const notificationService: NotificationService =
      this.injector.get<NotificationService>(NotificationService);
    void notificationService.initialize();
    const configurationService: ConfigurationService =
      this.injector.get<ConfigurationService>(ConfigurationService);
    void configurationService.initialize();
    void this.splashScreenService.hide();
  }
}
