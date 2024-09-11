import { Injectable, NgZone } from '@angular/core';
import {
  CallbackId,
  DeleteFileOptions,
  FirebaseStorage,
  GetDownloadUrlOptions,
  GetDownloadUrlResult,
  GetMetadataOptions,
  GetMetadataResult,
  ListFilesOptions,
  ListFilesResult,
  UpdateMetadataOptions,
  UploadFileCallback,
  UploadFileOptions,
} from '@capacitor-firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFirebaseStorageService {
  constructor(private readonly ngZone: NgZone) {}

  public uploadFile(
    options: UploadFileOptions,
    callback: UploadFileCallback,
  ): Promise<CallbackId> {
    return FirebaseStorage.uploadFile(options, (result, error) => {
      this.ngZone.run(() => {
        callback(result, error);
      });
    });
  }

  public deleteFile(options: DeleteFileOptions): Promise<void> {
    return FirebaseStorage.deleteFile(options);
  }

  public getDownloadUrl(
    options: GetDownloadUrlOptions,
  ): Promise<GetDownloadUrlResult> {
    return FirebaseStorage.getDownloadUrl(options);
  }

  public listFiles(options: ListFilesOptions): Promise<ListFilesResult> {
    return FirebaseStorage.listFiles(options);
  }

  public getMetadata(options: GetMetadataOptions): Promise<GetMetadataResult> {
    return FirebaseStorage.getMetadata(options);
  }

  public updateMetadata(options: UpdateMetadataOptions): Promise<void> {
    return FirebaseStorage.updateMetadata(options);
  }
}
