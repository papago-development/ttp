import { Injectable, NgZone } from '@angular/core';
import { Browser, OpenOptions } from '@capacitor/browser';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitorBrowserService {
  private readonly browserFinishedSubject = new Subject<void>();
  private readonly browserPageLoadedSubject = new Subject<void>();

  constructor(private readonly ngZone: NgZone) {
    void this.removeAllListeners().then(() => {
      void Browser.addListener('browserFinished', () => {
        this.ngZone.run(() => {
          this.browserFinishedSubject.next();
        });
      });
      void Browser.addListener('browserPageLoaded', () => {
        this.ngZone.run(() => {
          this.browserFinishedSubject.next();
        });
      });
    });
  }

  public get browserFinished$(): Observable<void> {
    return this.browserFinishedSubject.asObservable();
  }

  public get browserPageLoaded$(): Observable<void> {
    return this.browserPageLoadedSubject.asObservable();
  }

  public close(): Promise<void> {
    return Browser.close();
  }

  public open(options: OpenOptions): Promise<void> {
    return Browser.open(options);
  }

  public async removeAllListeners(): Promise<void> {
    await Browser.removeAllListeners();
  }
}
