import { Routes } from '@angular/router';

import { Sidenav } from './components/navigations/sidenav/sidenav';
import { Weather } from './components/pages/weather/weather';
import { Home } from './components/pages/home/home';
import { Extensions } from './components/pages/extensions/extensions';
import { Todos } from './components/pages/todos/todos';
import { JobListing } from './components/pages/job-listing/job-listing';
import { JobDetails } from './components/pages/job-listing/job-details/job-details';

export const routes: Routes = [
  {
    path: '',
    component: Sidenav,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'weather', component: Weather, pathMatch: 'full' },
      { path: 'extensions', component: Extensions, pathMatch: 'full' },
      { path: 'todos', component: Todos, pathMatch: 'full' },
      { path: 'joblisting', component: JobListing, pathMatch: 'full' },
      { path: 'joblisting/:id', component: JobDetails, pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
