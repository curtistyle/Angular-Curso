import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'selector', loadChildren: () => import('./countries/countries.routes').then(m => m.countriesRoutes)},
  { path: '**', redirectTo: 'selector'}
];
