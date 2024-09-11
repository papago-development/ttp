import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./domains/login/routes').then(m => m.routes),
    canActivate: [noAuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./domains/register/routes').then(m => m.routes),
    canActivate: [noAuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./domains/forgot-password/routes').then(m => m.routes),
    canActivate: [noAuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./domains/profile/routes').then(m => m.routes),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () => import('./domains/tabs/routes').then(m => m.routes),
    canActivate: [authGuard],
  },
];
