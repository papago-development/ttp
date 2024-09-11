import { Routes } from '@angular/router';
import { leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.page').then(
        m => m.ForgotPasswordPage,
      ),
    canDeactivate: [leavePageGuard],
  },
];
