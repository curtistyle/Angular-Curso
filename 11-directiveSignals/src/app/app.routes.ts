import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then(m => m.productsRoutes)
  },
  {
    path: 'signals',
    loadChildren: () => import('./signals/signals.routes').then(m => m.signalsRoutes)
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];
