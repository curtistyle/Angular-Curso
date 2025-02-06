import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./products/products.routes').then(m => m.routes)
  }
];
