import { Routes } from '@angular/router';

import { Sidenav } from './components/navigations/sidenav/sidenav';
import { Weather } from './components/pages/weather/weather';

export const routes: Routes = [
  {
    path: '',
    component: Sidenav,
    children: [{ path: 'weather', component: Weather, pathMatch: 'full' }],
  },
];
