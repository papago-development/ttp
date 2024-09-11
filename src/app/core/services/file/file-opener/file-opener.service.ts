import { Injectable } from '@angular/core';
import { CapacitorFileOpenerService } from '../../capacitor';

@Injectable({
  providedIn: 'root',
})
export class FileOpenerService {
  constructor(
    private readonly capacitorFileOpenerService: CapacitorFileOpenerService,
  ) {}

  public async openFile(options: {
    path?: string;
    blob?: Blob;
  }): Promise<void> {
    if (options.blob) {
      const objectUrl = URL.createObjectURL(options.blob);
      window.open(objectUrl, '_blank');
    } else if (options.path) {
      await this.capacitorFileOpenerService.openFile({
        path: options.path,
      });
    }
  }
}
