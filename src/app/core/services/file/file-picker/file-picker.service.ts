import { Injectable } from '@angular/core';
import { PickedFile } from '@capawesome/capacitor-file-picker';
import { TranslocoService } from '@jsverse/transloco';
import { CapacitorFilePickerService } from '../../capacitor';
import { ConfigurationService } from '../../configuration/configuration.service';
import { ErrorParserService } from '../../error';

@Injectable({
  providedIn: 'root',
})
export class FilePickerService {
  constructor(
    private readonly capacitorFilePickerService: CapacitorFilePickerService,
    private readonly configurationService: ConfigurationService,
    private readonly errorParserService: ErrorParserService,
    private readonly translocoService: TranslocoService,
  ) {}

  public async pickFile(): Promise<PickedFile | undefined> {
    try {
      const result = await this.capacitorFilePickerService.pickFiles({
        limit: 1,
        readData: false,
      });
      const file = result.files[0];
      await this.throwErrorIfMaxFileSizeExceeded(file);
      return file;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  public async pickImage(): Promise<PickedFile | undefined> {
    try {
      const result = await this.capacitorFilePickerService.pickImages({
        limit: 1,
        readData: false,
        skipTranscoding: true,
      });
      const file = result.files[0];
      await this.throwErrorIfMaxFileSizeExceeded(file);
      return file;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  public async pickVideo(): Promise<PickedFile | undefined> {
    try {
      const result = await this.capacitorFilePickerService.pickVideos({
        limit: 1,
        readData: false,
        skipTranscoding: true,
      });
      const file = result.files[0];
      await this.throwErrorIfMaxFileSizeExceeded(file);
      return file;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  private async throwErrorIfMaxFileSizeExceeded(
    file: PickedFile,
  ): Promise<void> {
    const maxFileSize =
      await this.configurationService.getNumber('max_file_size');
    if (file.size > maxFileSize) {
      const message = this.translocoService.translate(
        'core.message.error.filePicker.maxFileSizeExceeded',
        {
          maxFileSizeInMb: maxFileSize / 1024 / 1024,
        },
      );
      throw new Error(message);
    }
  }

  private handleError(error: unknown): void {
    const message = this.errorParserService.getMessageFromUnknownError(error);
    if (message.includes('canceled')) {
      return;
    }
    throw new Error(message);
  }
}
