import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home.component') },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes') },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
