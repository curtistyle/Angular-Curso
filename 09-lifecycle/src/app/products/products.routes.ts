import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';

export const productsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'product', component: ProductComponent },
      { path: '**', redirectTo: 'product' }
    ]
  }
];

