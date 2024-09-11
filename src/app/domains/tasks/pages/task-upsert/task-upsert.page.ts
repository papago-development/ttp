import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeactivationGuard, FirebaseAuthenticationService } from '@app/core';
import { SharedModule } from '@app/shared';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { addIcons } from 'ionicons';
import { add, cloudDownload, document, trash } from 'ionicons/icons';
import { Task, TaskFile } from '../../interfaces';
import { TaskUpsertPageService } from '../../services';

@Component({
  selector: 'app-task-upsert',
  templateUrl: './task-upsert.page.html',
  styleUrls: ['./task-upsert.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    TranslocoPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonToggle,
    IonDatetime,
    IonItemSliding,
    IonIcon,
    IonLabel,
    IonSpinner,
    IonItemOptions,
    IonItemOption,
    IonBackButton,
    IonSkeletonText,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskUpsertPage implements DeactivationGuard {
  public readonly taskId: string | undefined =
    this.activatedRoute.snapshot.params['id'];
  public readonly filesFormControl = new FormControl<TaskFile[]>([]);
  public readonly form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl<string | null>(null),
    files: this.filesFormControl,
  });
  public readonly task = this.taskId
    ? this.taskUpsertPageService.getTaskById(this.taskId).result
    : signal(undefined);

  private readonly addTask = this.taskUpsertPageService.addTask();
  private readonly updateTask = this.taskUpsertPageService.updateTask();
  private readonly deleteTask = this.taskUpsertPageService.deleteTask();
  private readonly files = this.taskId
    ? this.taskUpsertPageService.getTaskFilesByTaskId(this.taskId).result
    : signal(undefined);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly taskUpsertPageService: TaskUpsertPageService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    addIcons({ document, cloudDownload, trash, add });
    effect(() => {
      const task = this.task()?.data;
      if (task === null) {
        void this.throwErrorAndNavigateToTaskListPage();
      } else {
        this.patchFormValue(task);
      }
    });
    effect(() => {
      const files = this.files()?.data;
      if (files) {
        this.setFilesFormControlValue(files);
      }
    });
  }

  public async canDeactivate(): Promise<boolean> {
    if (!this.form.dirty) {
      return true;
    }
    return this.taskUpsertPageService.presentUnsavedChangesAlert();
  }

  public async onDeleteTask(): Promise<void> {
    const task = this.task()?.data;
    if (!task) {
      return;
    }
    await this.deleteTask.mutateAsync(task.id);
    this.form.markAsPristine();
    await this.taskUpsertPageService.navigateToTaskListPage();
  }

  public async onDownloadFile(file: TaskFile): Promise<void> {
    if (!this.taskId) {
      return;
    }
    await this.taskUpsertPageService.downloadFile(this.taskId, file);
  }

  public async onOpenFile(file: TaskFile): Promise<void> {
    await this.taskUpsertPageService.openFile(file);
  }

  public async onDeleteFile(file: TaskFile): Promise<void> {
    file.isDeleted.set(true);
    this.form.markAsDirty();
  }

  public async onPresentPickFileActionSheet(): Promise<void> {
    const pickedFile =
      await this.taskUpsertPageService.presentPickFileActionSheet();
    if (pickedFile) {
      this.appendFile(pickedFile);
    }
  }

  public async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    const savedTask = await this.saveTask();
    await this.saveTaskFiles(savedTask.id);
    this.form.markAsPristine();
    await this.taskUpsertPageService.navigateToTaskListPage();
  }

  public onToggleDueDateEnabled(): void {
    this.form.patchValue({
      dueDate: this.form.value.dueDate ? null : new Date().toISOString(),
    });
    this.form.markAsDirty();
  }

  private appendFile(file: TaskFile): void {
    this.filesFormControl.setValue([
      ...(this.filesFormControl.value || []),
      file,
    ]);
    this.filesFormControl.markAsDirty();
    this.changeDetectorRef.markForCheck();
  }

  private patchFormValue(task: Task | undefined): void {
    this.form.patchValue({
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
    });
    this.changeDetectorRef.markForCheck();
  }

  private setFilesFormControlValue(files: TaskFile[]): void {
    this.filesFormControl.setValue(files);
    this.changeDetectorRef.markForCheck();
  }

  private throwErrorAndNavigateToTaskListPage(): void {
    void this.taskUpsertPageService.navigateToTaskListPage();
    this.taskUpsertPageService.throwTaskNotFoundError();
  }

  private async saveTask(): Promise<Task> {
    const currentUserId =
      await this.firebaseAuthenticationService.getCurrentUserId();
    const task = this.task()?.data;
    const options: Omit<Task, 'id'> = {
      title: this.form.value.title || '',
      description: this.form.value.description || null,
      dueDate: this.form.value.dueDate || null,
      createdAt: task ? task.createdAt : new Date().toISOString(),
      createdBy: task ? task.createdBy : currentUserId || '',
      updatedAt: new Date().toISOString(),
      updatedBy: currentUserId || '',
    };
    if (task) {
      return this.updateTask.mutateAsync({
        id: task?.id,
        ...options,
      });
    } else {
      return this.addTask.mutateAsync(options);
    }
  }

  private async saveTaskFiles(taskId: string): Promise<void> {
    await this.taskUpsertPageService
      .setTaskFilesByTaskId(taskId)
      .mutateAsync(this.filesFormControl.value || []);
  }
}
