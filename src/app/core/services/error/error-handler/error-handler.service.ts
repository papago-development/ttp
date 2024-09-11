import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { DialogService } from '../../dialog/dialog.service';
import { ErrorParserService } from '../error-parser-service/error-parser-service.service';

const LOGTAG = '[ErrorHandlerService]';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  public handleError(error: unknown): void {
    void this.handle(error);
  }

  private async handle(error: unknown): Promise<void> {
    try {
      console.error(error);
      const errorParserService: ErrorParserService =
        this.injector.get<ErrorParserService>(ErrorParserService);
      const message = errorParserService.getMessageFromUnknownError(error);
      await this.presentErrorAlert(message);
    } catch (errorHandlerError) {
      console.error(`${LOGTAG} Internal exception:`, errorHandlerError);
    }
  }

  private async presentErrorAlert(message: string): Promise<void> {
    const dialogService: DialogService =
      this.injector.get<DialogService>(DialogService);
    await dialogService.presentErrorAlert({ message });
  }
}
