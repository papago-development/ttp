import { Injectable, NgZone } from '@angular/core';
import {
  App,
  AppInfo,
  AppLaunchUrl,
  AppState,
  BackButtonListenerEvent,
  RestoredListenerEvent,
  URLOpenListenerEvent,
} from '@capacitor/app';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitorAppService {
  private readonly appStateChangeSubject = new Subject<AppState>();
  private readonly appRestoredResultSubject =
    new Subject<RestoredListenerEvent>();
  private readonly appUrlOpenSubject = new Subject<URLOpenListenerEvent>();
  private readonly backButtonSubject = new Subject<BackButtonListenerEvent>();
  private readonly pauseSubject = new Subject<void>();
  private readonly resumeSubject = new Subject<void>();

  constructor(private readonly ngZone: NgZone) {
    void this.removeAllListeners().then(() => {
      void App.addListener('appStateChange', event => {
        this.ngZone.run(() => {
          this.appStateChangeSubject.next(event);
        });
      });
      void App.addListener('appRestoredResult', event => {
        this.ngZone.run(() => {
          this.appRestoredResultSubject.next(event);
        });
      });
      void App.addListener('appUrlOpen', event => {
        this.ngZone.run(() => {
          this.appUrlOpenSubject.next(event);
        });
      });
      void App.addListener('backButton', event => {
        this.ngZone.run(() => {
          this.backButtonSubject.next(event);
        });
      });
      void App.addListener('pause', () => {
        this.ngZone.run(() => {
          this.pauseSubject.next();
        });
      });
      void App.addListener('resume', () => {
        this.ngZone.run(() => {
          this.resumeSubject.next();
        });
      });
    });
  }

  public get appStateChange$(): Observable<AppState> {
    return this.appStateChangeSubject.asObservable();
  }

  public get appRestoredResult$(): Observable<RestoredListenerEvent> {
    return this.appRestoredResultSubject.asObservable();
  }

  public get appUrlOpen$(): Observable<URLOpenListenerEvent> {
    return this.appUrlOpenSubject.asObservable();
  }

  public get backButton$(): Observable<BackButtonListenerEvent> {
    return this.backButtonSubject.asObservable();
  }

  public get pause$(): Observable<void> {
    return this.pauseSubject.asObservable();
  }

  public get resume$(): Observable<void> {
    return this.resumeSubject.asObservable();
  }

  public exitApp(): Promise<void> {
    return App.exitApp();
  }

  public getInfo(): Promise<AppInfo> {
    return App.getInfo();
  }

  public getState(): Promise<AppState> {
    return App.getState();
  }

  public getLaunchUrl(): Promise<AppLaunchUrl | undefined> {
    return App.getLaunchUrl();
  }

  public minimizeApp(): Promise<void> {
    return App.minimizeApp();
  }

  public async removeAllListeners(): Promise<void> {
    await App.removeAllListeners();
  }
}
