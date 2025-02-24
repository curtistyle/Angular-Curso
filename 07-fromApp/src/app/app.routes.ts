import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then( r => r.ReactiveRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then( r => r.AuthRoutes)
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];
