import { Routes } from '@angular/router';

import { Sidenav } from './components/navigations/sidenav/sidenav';
import { Weather } from './components/pages/weather/weather';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Sidenav,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'weather', component: Weather, pathMatch: 'full' },
    ],
  },
];
