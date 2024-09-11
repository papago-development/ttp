import { Routes } from '@angular/router';
import { leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/settings/settings.page').then(m => m.SettingsPage),
    canDeactivate: [leavePageGuard],
  },
];
