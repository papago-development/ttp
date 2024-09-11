import { Injectable } from '@angular/core';
import { SyncResult } from '@capawesome/capacitor-live-update';
import { Observable, ReplaySubject } from 'rxjs';
import { CapacitorLiveUpdateService } from '../capacitor';
import { PlatformService } from '../platform/platform.service';
import { SplashScreenService } from '../splash-screen/splash-screen.service';

@Injectable({
  providedIn: 'root',
})
export class LiveUpdateService {
  public readonly isUpdateAvailable$: Observable<boolean>;

  private readonly isUpdateAvailableSubject = new ReplaySubject<boolean>(1);

  constructor(
    private readonly platformService: PlatformService,
    private readonly capacitorLiveUpdateService: CapacitorLiveUpdateService,
    private readonly splashScreenService: SplashScreenService,
  ) {
    this.isUpdateAvailable$ = this.isUpdateAvailableSubject.asObservable();
  }

  public initialize(): void {
    const isNative = this.platformService.isNative();
    if (!isNative) {
      return;
    }
    void this.ready();
    void this.sync();
  }

  public async reload(): Promise<void> {
    await this.splashScreenService.show();
    await this.capacitorLiveUpdateService.reload();
  }

  public async sync(): Promise<SyncResult> {
    await this.setChannel();
    const syncResult = await this.capacitorLiveUpdateService.sync();
    this.isUpdateAvailableSubject.next(!!syncResult.nextBundleId);
    return syncResult;
  }

  private async ready(): Promise<void> {
    await this.capacitorLiveUpdateService.ready();
  }

  private async setChannel(): Promise<void> {
    const { versionCode } =
      await this.capacitorLiveUpdateService.getVersionCode();
    await this.capacitorLiveUpdateService.setChannel({
      channel: `production-${versionCode}`,
    });
  }
}
