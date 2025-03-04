import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.routes').then( m => m.mapsRoutes )
  },
  {
    path: '**',
    redirectTo: 'maps'
  }
];
