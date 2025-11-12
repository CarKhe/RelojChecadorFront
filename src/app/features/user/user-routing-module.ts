import { Routes } from '@angular/router';
import { Layout } from '../../core/layout/layout/layout';
import { TimeClockModule } from '../shared/pages/time-clock-module/time-clock-module';

export const USER_ROUTES: Routes = [
  {
    path: '', 
    component: Layout,
    children: [
      {path: 'time', component: TimeClockModule},
      { path: '**', component: TimeClockModule }
    ]
  }
];


