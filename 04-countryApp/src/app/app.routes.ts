import { Routes } from '@angular/router';
import {HomePageComponent} from './shared/pages/home-page/home-page.component';
import {AboutPageComponent} from './shared/pages/about-page/about-page.component';
import {ContactPageComponent} from './shared/pages/contact-page/contact-page.component';
//import { counterRoutes } from './countries/countries.routes';

export const routes: Routes = [
  //{ path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'countries', loadChildren: () => import('./countries/countries.routes')
      .then(m => m.counterRoutes) },
  { path: '**', redirectTo: 'countries' }
];

