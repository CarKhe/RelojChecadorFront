import { Routes } from '@angular/router';
import { Layout } from '../../core/layout/layout/layout';
import { TimeClockModule } from '../shared/pages/time-clock-module/time-clock-module';
import { MisAsistenciasModulo } from './pages/mis-asistencias-modulo/mis-asistencias-modulo';

export const USER_ROUTES: Routes = [
  {
    path: '', 
    component: Layout,
    children: [
      { path: 'time', component: TimeClockModule },
      { path: 'misAsistencias', component: MisAsistenciasModulo },
      { path: '**', component: TimeClockModule }
    ]
  }
];


