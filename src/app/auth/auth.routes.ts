import { Routes } from '@angular/router';

export default [
  {
    path: 'sign-in',
    loadComponent: () => import('./login/login.component'),
    title: 'Sign in',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./register/register.component'),
    title: 'Sign up',
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./forget-password/forget-password.component'),
    title: 'Recover password',
  },
] as Routes;
