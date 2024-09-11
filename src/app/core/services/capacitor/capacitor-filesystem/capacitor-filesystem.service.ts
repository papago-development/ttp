import { Injectable } from '@angular/core';
import {
  AppendFileOptions,
  CopyOptions,
  CopyResult,
  DeleteFileOptions,
  DownloadFileOptions,
  DownloadFileResult,
  Filesystem,
  GetUriOptions,
  GetUriResult,
  MkdirOptions,
  PermissionStatus,
  ReaddirOptions,
  ReaddirResult,
  ReadFileOptions,
  ReadFileResult,
  RenameOptions,
  RmdirOptions,
  StatOptions,
  StatResult,
  WriteFileOptions,
  WriteFileResult,
} from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFilesystemService {
  constructor() {}

  public readFile(options: ReadFileOptions): Promise<ReadFileResult> {
    return Filesystem.readFile(options);
  }

  public writeFile(options: WriteFileOptions): Promise<WriteFileResult> {
    return Filesystem.writeFile(options);
  }

  public appendFile(options: AppendFileOptions): Promise<void> {
    return Filesystem.appendFile(options);
  }

  public deleteFile(options: DeleteFileOptions): Promise<void> {
    return Filesystem.deleteFile(options);
  }

  public mkdir(options: MkdirOptions): Promise<void> {
    return Filesystem.mkdir(options);
  }

  public rmdir(options: RmdirOptions): Promise<void> {
    return Filesystem.rmdir(options);
  }

  public readdir(options: ReaddirOptions): Promise<ReaddirResult> {
    return Filesystem.readdir(options);
  }

  public getUri(options: GetUriOptions): Promise<GetUriResult> {
    return Filesystem.getUri(options);
  }

  public stat(options: StatOptions): Promise<StatResult> {
    return Filesystem.stat(options);
  }

  public rename(options: RenameOptions): Promise<void> {
    return Filesystem.rename(options);
  }

  public copy(options: CopyOptions): Promise<CopyResult> {
    return Filesystem.copy(options);
  }

  public downloadFile(
    options: DownloadFileOptions,
  ): Promise<DownloadFileResult> {
    return Filesystem.downloadFile(options);
  }

  public checkPermissions(): Promise<PermissionStatus> {
    return Filesystem.checkPermissions();
  }

  public requestPermissions(): Promise<PermissionStatus> {
    return Filesystem.requestPermissions();
  }
}
