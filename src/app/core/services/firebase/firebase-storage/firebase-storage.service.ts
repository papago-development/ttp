import { Injectable } from '@angular/core';
import {
  DeleteFileOptions,
  GetDownloadUrlOptions,
  GetDownloadUrlResult,
  ListFilesOptions,
  ListFilesResult,
  UploadFileCallbackEvent,
  UploadFileOptions,
} from '@capacitor-firebase/storage';
import { CapacitorFirebaseStorageService } from '../../capacitor';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(
    private readonly capacitorFirebaseStorageService: CapacitorFirebaseStorageService,
  ) {}

  public async getDownloadUrl(
    options: GetDownloadUrlOptions,
  ): Promise<GetDownloadUrlResult> {
    return this.capacitorFirebaseStorageService.getDownloadUrl(options);
  }

  public listFiles(options: ListFilesOptions): Promise<ListFilesResult> {
    return this.capacitorFirebaseStorageService.listFiles(options);
  }

  public uploadFile(
    options: UploadFileOptions,
    callback?: (event: UploadFileCallbackEvent) => void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      void this.capacitorFirebaseStorageService.uploadFile(
        options,
        (event, error) => {
          if (error) {
            reject(error);
          } else if (event) {
            if (callback) {
              callback(event);
            }
            if (event.completed) {
              resolve();
            }
          }
        },
      );
    });
  }

  public deleteFile(options: DeleteFileOptions): Promise<void> {
    return this.capacitorFirebaseStorageService.deleteFile(options);
  }
}
