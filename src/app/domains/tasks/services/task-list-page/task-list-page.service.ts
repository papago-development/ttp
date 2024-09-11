import { Injectable } from '@angular/core';
import { FirebaseAuthenticationService, RouterService } from '@app/core';
import {
  QueryCompositeFilterConstraint,
  QueryNonFilterConstraint,
} from '@capacitor-firebase/firestore';
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  MutationResult,
  injectInfiniteQuery,
  injectMutation,
  injectQueryClient,
} from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { Task } from '../../interfaces';
import { TasksService } from '../tasks/tasks.service';

@Injectable({
  providedIn: 'root',
})
export class TaskListPageService {
  #client = injectQueryClient();
  #mutation = injectMutation();
  #query = injectInfiniteQuery();

  constructor(
    private readonly routerService: RouterService,
    private readonly tasksService: TasksService,
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
  ) {}

  public getTasks(options: {
    limit: number;
  }): Result<
    InfiniteQueryObserverResult<InfiniteData<Task[], unknown>, Error>
  > {
    return this.#query({
      queryKey: ['tasks'],
      queryFn: async ({ pageParam }) => {
        const currentUserId =
          await this.firebaseAuthenticationService.getCurrentUserId();
        const compositeFilter: QueryCompositeFilterConstraint = {
          type: 'and',
          queryConstraints: [
            {
              type: 'where',
              fieldPath: 'createdBy',
              opStr: '==',
              value: currentUserId,
            },
          ],
        };
        const createdAtKey: keyof Task = 'createdAt';
        const queryConstraints: QueryNonFilterConstraint[] = [
          {
            type: 'orderBy',
            fieldPath: createdAtKey,
            directionStr: 'desc',
          },
          {
            type: 'limit',
            limit: options.limit,
          },
        ];
        if (pageParam) {
          queryConstraints.push({
            type: 'startAfter',
            reference: `${TasksService.firestoreBasePath}/${pageParam}`,
          });
        }
        return this.tasksService.getTasks({
          compositeFilter,
          queryConstraints,
        });
      },
      initialPageParam: null as string | null,
      getNextPageParam: lastPage =>
        lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null,
      throwOnError: true,
    });
  }

  public deleteTask(): MutationResult<void, Error, string, unknown> {
    return this.#mutation({
      mutationFn: (id: string) => this.tasksService.deleteTask(id),
      onSuccess: () => {
        void this.#client.invalidateQueries({ queryKey: ['tasks'] });
      },
    });
  }

  public async refetchTasks(): Promise<void> {
    this.#client.setQueryData<InfiniteData<Task[], unknown>>(
      ['tasks'],
      data => {
        if (data) {
          return {
            pages: data.pages.slice(0, 1),
            pageParams: data.pageParams.slice(0, 1),
          };
        } else {
          return data;
        }
      },
    );
    await this.#client.refetchQueries({ queryKey: ['tasks'] });
  }

  public async navigateToTaskUpsertPage(taskId?: string): Promise<void> {
    await this.routerService.navigateToTaskUpsertPage(taskId);
  }
}
