import { WritableSignal } from '@angular/core';

export interface TaskFile {
  readonly name: string;
  readonly localPath: WritableSignal<string | undefined>;
  readonly remotePath: string | undefined;
  readonly blob: WritableSignal<Blob | undefined>;
  readonly downloadInProgress: WritableSignal<boolean>;
  readonly isDeleted: WritableSignal<boolean>;
}
