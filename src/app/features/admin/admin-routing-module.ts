import { Routes } from '@angular/router';
import { UserModule } from './pages/user-module/user-module';
import { Layout } from '../../core/layout/layout/layout';
import { AreaModule } from './pages/area-module/area-module';
import { TimeClockModule } from '../shared/pages/time-clock-module/time-clock-module';
import { DashboardModule } from './pages/dashboard-module/dashboard-module';
import { PlantillaModule } from './pages/plantilla-module/plantilla-module';
import { MisAsistenciasModulo } from '../user/pages/mis-asistencias-modulo/mis-asistencias-modulo';

export const ADMIN_ROUTES: Routes = [
    { 
        path: '', 
        component: Layout,
        children: [
            { path:'user', component: UserModule },
            { path:'area', component: AreaModule },
            { path:'time', component: TimeClockModule },
            { path:'dashboard', component: DashboardModule },
            { path: 'misAsistencias', component: MisAsistenciasModulo },
            { path: '**', component: DashboardModule }
        ]
     },
];

