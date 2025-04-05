import { Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const productsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'product', component: ProductPageComponent },
      { path: '**', redirectTo: 'product' }
    ]
  }
]
