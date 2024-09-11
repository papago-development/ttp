import { Injectable } from '@angular/core';
import {
  FileOpener,
  OpenFileOptions,
} from '@capawesome-team/capacitor-file-opener';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFileOpenerService {
  constructor() {}

  public openFile(options: OpenFileOptions): Promise<void> {
    return FileOpener.openFile(options);
  }
}
