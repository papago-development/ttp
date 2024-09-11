import { Routes } from '@angular/router';
import { leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage),
    canDeactivate: [leavePageGuard],
  },
];
