import { Routes } from '@angular/router';
import { leavePageGuard } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canDeactivate: [leavePageGuard],
  },
];
