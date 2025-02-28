import { Routes } from "@angular/router";

export default [
  { path: 'login', loadComponent: ()=> import('./login/login.component'), title: 'Inicio de sesion'},
  { path: 'forget-password', loadComponent: ()=> import('./forget-password/forget-password.component'), title: 'Recuperar clave'},
  { path:'', redirectTo: 'login', pathMatch:'full'}
] as Routes
