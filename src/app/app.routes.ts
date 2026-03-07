import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Sidenav } from './components/navigations/sidenav/sidenav';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [{ path: '', component: Sidenav, pathMatch: 'full' }],
  },
];
