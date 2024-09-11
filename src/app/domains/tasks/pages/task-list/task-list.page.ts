import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';
import { Task } from '../../interfaces';
import { TaskListPageService } from '../../services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [
    SharedModule,
    AsyncPipe,
    DatePipe,
    TranslocoPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    IonSkeletonText,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPage {
  public readonly numberOfTasksPerPage = Math.floor(window.innerHeight / 40);
  public readonly tasks = this.taskListPageService.getTasks({
    limit: this.numberOfTasksPerPage,
  }).result;

  private readonly deleteTask = this.taskListPageService.deleteTask();

  constructor(private readonly taskListPageService: TaskListPageService) {
    addIcons({ trash, add });
  }

  public createFakeArray(length: number): number[] {
    return Array.from({ length });
  }

  public async onDeleteTask(task: Task): Promise<void> {
    this.deleteTask.mutate(task.id);
  }

  public async onNavigateToTaskUpsertPage(task?: Task): Promise<void> {
    await this.taskListPageService.navigateToTaskUpsertPage(task?.id);
  }

  public async onIonRefresh(event: RefresherCustomEvent): Promise<void> {
    try {
      await this.taskListPageService.refetchTasks();
    } finally {
      await event.target.complete();
    }
  }

  public async onIonInfinite(event: InfiniteScrollCustomEvent): Promise<void> {
    try {
      await this.tasks().fetchNextPage();
    } finally {
      await event.target.complete();
    }
  }
}
