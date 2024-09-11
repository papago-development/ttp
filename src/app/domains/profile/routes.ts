import { Routes } from '@angular/router';
import { canDeactivateGuard, leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile/profile.page').then(m => m.ProfilePage),
    canDeactivate: [canDeactivateGuard, leavePageGuard],
  },
];
