import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(r => r.routes) },
  { path: 'heroes', loadChildren: () => import('./heroes/heroes.routes').then(r => r.routes) },
  { path: '404', component: Error404PageComponent },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];
