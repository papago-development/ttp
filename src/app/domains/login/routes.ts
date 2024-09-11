import { Routes } from '@angular/router';
import { leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
    canDeactivate: [leavePageGuard],
  },
];
