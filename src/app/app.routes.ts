import { Routes } from '@angular/router';

import { Sidenav } from './components/navigations/sidenav/sidenav';
import { Weather } from './components/pages/weather/weather';
import { Home } from './components/pages/home/home';
import { Extensions } from './components/pages/extensions/extensions';
import { Todos } from './components/pages/todos/todos';
import { JobListing } from './components/pages/job-listing/job-listing';
import { JobDetails } from './components/pages/job-listing/job-details/job-details';
import { CharacterCounter } from './components/pages/character-counter/character-counter';
import { environment } from './environments/environments';

export const routes: Routes = [
  {
    path: '',
    component: Sidenav,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: environment.apps.weather.route, component: Weather, pathMatch: 'full' },
      { path: environment.apps.extensions.route, component: Extensions, pathMatch: 'full' },
      { path: environment.apps.todos.route, component: Todos, pathMatch: 'full' },
      { path: environment.apps.joblisting.route, component: JobListing, pathMatch: 'full' },
      {
        path: environment.apps.joblisting.route + '/:id',
        component: JobDetails,
        pathMatch: 'full',
      },
      {
        path: environment.apps.characterCounter.route,
        component: CharacterCounter,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
