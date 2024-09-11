import { Injectable } from '@angular/core';
import { Directory } from '@capacitor/filesystem';
import { CapacitorFilesystemService } from '../../capacitor';
import { ErrorParserService } from '../../error';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(
    private readonly capacitorFilesystemService: CapacitorFilesystemService,
    private readonly errorParserService: ErrorParserService,
  ) {}

  public async createCacheDirectory(options: { path: string }): Promise<void> {
    try {
      await this.capacitorFilesystemService.mkdir({
        path: options.path,
        directory: Directory.Cache,
        recursive: true,
      });
    } catch (error) {
      const message = this.errorParserService.getMessageFromUnknownError(error);
      if (
        message.includes('Current directory does already exist.') ||
        message.includes('Directory exists')
      ) {
        return;
      }
      throw new Error(message);
    }
  }

  public downloadFile(options: { url: string; path: string }): Promise<{
    path?: string;
    blob?: Blob;
  }> {
    return this.capacitorFilesystemService.downloadFile({
      url: options.url,
      path: options.path,
      directory: Directory.Cache,
    });
  }
}
