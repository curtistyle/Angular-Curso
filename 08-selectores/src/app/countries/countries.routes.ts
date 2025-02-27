import { Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

export const countriesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'selector', component: SelectorPageComponent },
      { path: '**', redirectTo: 'selector' }
    ]
  },

]
