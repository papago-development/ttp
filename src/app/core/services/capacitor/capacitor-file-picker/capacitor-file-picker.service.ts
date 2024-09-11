import { Injectable, NgZone } from '@angular/core';
import {
  ConvertHeicToJpegOptions,
  ConvertHeicToJpegResult,
  FilePicker,
  PickFilesOptions,
  PickFilesResult,
  PickImagesOptions,
  PickImagesResult,
  PickMediaOptions,
  PickMediaResult,
  PickVideosOptions,
  PickVideosResult,
} from '@capawesome/capacitor-file-picker';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFilePickerService {
  private readonly pickerDismissedSubject = new Subject<void>();

  constructor(private readonly ngZone: NgZone) {
    void this.removeAllListeners().then(() => {
      void FilePicker.addListener('pickerDismissed', () => {
        this.ngZone.run(() => {
          this.pickerDismissedSubject.next();
        });
      });
    });
  }

  public get pickerDismissed$(): Observable<void> {
    return this.pickerDismissedSubject.asObservable();
  }

  public convertHeicToJpeg(
    options: ConvertHeicToJpegOptions,
  ): Promise<ConvertHeicToJpegResult> {
    return FilePicker.convertHeicToJpeg(options);
  }

  public pickFiles(options: PickFilesOptions): Promise<PickFilesResult> {
    return FilePicker.pickFiles(options);
  }

  public pickImages(options: PickImagesOptions): Promise<PickImagesResult> {
    return FilePicker.pickImages(options);
  }

  public pickMedia(options: PickMediaOptions): Promise<PickMediaResult> {
    return FilePicker.pickMedia(options);
  }

  public pickVideos(options: PickVideosOptions): Promise<PickVideosResult> {
    return FilePicker.pickVideos(options);
  }

  public removeAllListeners(): Promise<void> {
    return FilePicker.removeAllListeners();
  }
}
