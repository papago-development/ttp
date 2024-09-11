import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly platformSubject = new BehaviorSubject<string>(
    Capacitor.getPlatform(),
  );
  private readonly isAndroidSubject = new BehaviorSubject<boolean>(
    Capacitor.getPlatform() === 'android',
  );
  private readonly isIosSubject = new BehaviorSubject<boolean>(
    Capacitor.getPlatform() === 'ios',
  );
  private readonly isWebSubject = new BehaviorSubject<boolean>(
    Capacitor.getPlatform() === 'web',
  );
  private readonly isNativeSubject = new BehaviorSubject<boolean>(
    Capacitor.isNativePlatform(),
  );

  constructor() {}

  public get platform$(): Observable<string> {
    return this.platformSubject.asObservable();
  }

  public get isAndroid$(): Observable<boolean> {
    return this.isAndroidSubject.asObservable();
  }

  public get isIos$(): Observable<boolean> {
    return this.isIosSubject.asObservable();
  }

  public get isWeb$(): Observable<boolean> {
    return this.isWebSubject.asObservable();
  }

  public get isNative$(): Observable<boolean> {
    return this.isNativeSubject.asObservable();
  }

  public getPlatform(): string {
    return Capacitor.getPlatform();
  }

  public isAndroid(): boolean {
    return this.isAndroidSubject.getValue();
  }

  public isIos(): boolean {
    return this.isIosSubject.getValue();
  }

  public isWeb(): boolean {
    return this.isWebSubject.getValue();
  }

  public isNative(): boolean {
    return this.isNativeSubject.getValue();
  }
}
