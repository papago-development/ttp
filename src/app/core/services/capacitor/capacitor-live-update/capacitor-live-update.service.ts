import { Injectable } from '@angular/core';
import {
  GetVersionCodeResult,
  LiveUpdate,
  SetChannelOptions,
  SyncResult,
} from '@capawesome/capacitor-live-update';

@Injectable({
  providedIn: 'root',
})
export class CapacitorLiveUpdateService {
  private activeSync: Promise<SyncResult> | null = null;

  constructor() {}

  public getVersionCode(): Promise<GetVersionCodeResult> {
    return LiveUpdate.getVersionCode();
  }

  public ready(): Promise<void> {
    return LiveUpdate.ready();
  }

  public reload(): Promise<void> {
    return LiveUpdate.reload();
  }

  public setChannel(options: SetChannelOptions): Promise<void> {
    return LiveUpdate.setChannel(options);
  }

  public async sync(): Promise<SyncResult> {
    if (this.activeSync) {
      return this.activeSync;
    }
    this.activeSync = LiveUpdate.sync();
    const result = await this.activeSync;
    this.activeSync = null;
    return result;
  }
}
