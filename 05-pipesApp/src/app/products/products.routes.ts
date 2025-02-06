import {Routes} from '@angular/router';
import {BasicsPagesComponent} from './pages/basics-pages/basics-pages.component';
import {NumbersPageComponent} from './pages/numbers-page/numbers-page.component';
import {UncommonPageComponent} from './pages/uncommon-page/uncommon-page.component';

export const routes: Routes =[
  {
    path:'',
    component: BasicsPagesComponent
  },
  {
    path: 'numbers',
    component: NumbersPageComponent
  },
  {
    path: 'uncommon',
    component: UncommonPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]
