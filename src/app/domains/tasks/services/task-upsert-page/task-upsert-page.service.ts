import { Injectable, signal } from '@angular/core';
import {
  DialogService,
  FileOpenerService,
  FilePickerService,
  RouterService,
} from '@app/core';
import { PickedFile } from '@capawesome/capacitor-file-picker';
import { TranslocoService } from '@jsverse/transloco';
import {
  MutationResult,
  QueryObserverResult,
  injectMutation,
  injectQuery,
  injectQueryClient,
  skipToken,
} from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { Task, TaskFile } from '../../interfaces';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root',
})
export class TaskUpsertPageService {
  private readonly disableTaskDetailQueries = signal(false);

  #client = injectQueryClient();
  #mutation = injectMutation();
  #query = injectQuery();

  constructor(
    private readonly tasksService: TasksService,
    private readonly fileOpenerService: FileOpenerService,
    private readonly filePickerService: FilePickerService,
    private readonly dialogService: DialogService,
    private readonly translocoService: TranslocoService,
    private readonly routerService: RouterService,
  ) {}

  public addTask(): MutationResult<Task, Error, Omit<Task, 'id'>, unknown> {
    return this.#mutation({
      mutationFn: (task: Omit<Task, 'id'>) => this.tasksService.addTask(task),
      onSuccess: () => {
        void this.#client.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  }

  public updateTask(): MutationResult<Task, Error, Task, unknown> {
    return this.#mutation({
      mutationFn: (task: Task) =>
        this.tasksService.updateTask(task.id, { ...task }),
      onSuccess: () => {
        void this.#client.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  }

  public getTaskById(
    id: string,
  ): Result<QueryObserverResult<Task | null, Error>> {
    return this.#query({
      queryKey: ['tasks', id],
      queryFn: () =>
        this.disableTaskDetailQueries()
          ? (skipToken as any)
          : this.tasksService.getTaskById(id),
      retry: false,
      throwOnError: true,
    });
  }

  public deleteTask(): MutationResult<void, Error, string, unknown> {
    return this.#mutation({
      mutationFn: (id: string) => this.tasksService.deleteTask(id),
      onSuccess: () => {
        this.disableTaskDetailQueries.set(true);
        void this.#client.invalidateQueries({ queryKey: ['tasks'] });
        this.disableTaskDetailQueries.set(false);
      },
    });
  }

  public setTaskFilesByTaskId(
    taskId: string,
  ): MutationResult<void, Error, TaskFile[], unknown> {
    return this.#mutation({
      mutationFn: async (files: TaskFile[]) => {
        const filesToDelete = files.filter(
          file => file.isDeleted() && file.remotePath,
        );
        await this.tasksService.deleteFiles(taskId, filesToDelete);
        const filesToUpload = files.filter(
          file => !file.isDeleted() && !file.remotePath,
        );
        await this.tasksService.uploadFiles(taskId, filesToUpload);
      },
      onSuccess: () => {
        void this.#client.invalidateQueries({
          queryKey: ['tasks', taskId, 'files'],
        });
      },
    });
  }

  public getTaskFilesByTaskId(
    taskId: string,
  ): Result<QueryObserverResult<TaskFile[], Error>> {
    return this.#query({
      queryKey: ['tasks', taskId, 'files'],
      queryFn: () =>
        this.disableTaskDetailQueries()
          ? (skipToken as any)
          : this.tasksService.listFiles(taskId),
      retry: false,
      throwOnError: true,
    });
  }

  public async openFile(file: TaskFile): Promise<void> {
    if (!file.blob && !file.localPath) {
      return;
    }
    await this.fileOpenerService.openFile({
      blob: file.blob(),
      path: file.localPath(),
    });
  }

  public async downloadFile(id: string, file: TaskFile): Promise<void> {
    file.downloadInProgress.set(true);
    try {
      const result = await this.tasksService.downloadFile(id, file.name);
      file.localPath.set(result.path);
      file.blob.set(result.blob);
    } finally {
      file.downloadInProgress.set(false);
    }
  }

  public async navigateToTaskListPage(): Promise<void> {
    await this.routerService.navigateToTaskListPage({
      animationDirection: 'back',
    });
  }

  public async presentPickFileActionSheet(): Promise<TaskFile | undefined> {
    return new Promise<TaskFile | undefined>(resolve => {
      void this.dialogService.presentActionSheet({
        buttons: [
          {
            text: this.translocoService.translate(
              'core.dialog.filePicker.label.image',
            ),
            handler: async (): Promise<void> => {
              const image = await this.pickImage();
              resolve(image);
            },
          },
          {
            text: this.translocoService.translate(
              'core.dialog.filePicker.label.video',
            ),
            handler: async (): Promise<void> => {
              const video = await this.pickVideo();
              resolve(video);
            },
          },
          {
            text: this.translocoService.translate(
              'core.dialog.filePicker.label.file',
            ),
            handler: async (): Promise<void> => {
              const file = await this.pickFile();
              resolve(file);
            },
          },
          {
            text: this.translocoService.translate(
              'core.dialog.filePicker.button.cancel',
            ),
            role: 'cancel',
          },
        ],
      });
    });
  }

  public async presentUnsavedChangesAlert(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      void this.dialogService.presentAlert({
        header: this.translocoService.translate(
          'core.dialog.unsavedChanges.header',
        ),
        message: this.translocoService.translate(
          'core.dialog.unsavedChanges.message',
        ),
        buttons: [
          {
            text: this.translocoService.translate(
              'core.dialog.unsavedChanges.button.cancel',
            ),
            role: 'cancel',
            handler: (): void => {
              resolve(false);
            },
          },
          {
            text: this.translocoService.translate(
              'core.dialog.unsavedChanges.button.continue',
            ),
            role: 'destructive',
            handler: (): void => {
              resolve(true);
            },
          },
        ],
      });
    });
  }

  public throwTaskNotFoundError(): never {
    const message = this.translocoService.translate(
      'domain.tasks.message.error.notFound',
    );
    throw new Error(message);
  }

  private async pickImage(): Promise<TaskFile | undefined> {
    const pickedFile = await this.filePickerService.pickImage();
    if (!pickedFile) {
      return;
    }
    return this.createTaskFile(pickedFile);
  }

  private async pickVideo(): Promise<TaskFile | undefined> {
    const pickedFile = await this.filePickerService.pickVideo();
    if (!pickedFile) {
      return;
    }
    return this.createTaskFile(pickedFile);
  }

  private async pickFile(): Promise<TaskFile | undefined> {
    const pickedFile = await this.filePickerService.pickFile();
    if (!pickedFile) {
      return;
    }
    return this.createTaskFile(pickedFile);
  }

  private createTaskFile(pickedFile: PickedFile): TaskFile {
    return {
      name: pickedFile.name,
      localPath: signal(pickedFile.path),
      remotePath: undefined,
      blob: signal(pickedFile.blob),
      downloadInProgress: signal(false),
      isDeleted: signal(false),
    };
  }
}
