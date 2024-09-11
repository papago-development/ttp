import { Routes } from '@angular/router';
import { canDeactivateGuard, leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/task-list/task-list.page').then(m => m.TaskListPage),
    canDeactivate: [leavePageGuard],
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/task-upsert/task-upsert.page').then(
        m => m.TaskUpsertPage,
      ),
    canDeactivate: [canDeactivateGuard, leavePageGuard],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/task-upsert/task-upsert.page').then(
        m => m.TaskUpsertPage,
      ),
    canDeactivate: [canDeactivateGuard, leavePageGuard],
  },
];
