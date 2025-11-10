import { Routes } from '@angular/router';
import { UserModule } from './pages/user-module/user-module';
import { Layout } from '../../core/layout/layout/layout';
import { AreaModule } from './pages/area-module/area-module';

export const ADMIN_ROUTES: Routes = [
    { 
        path: '', 
        component: Layout,
        children: [
            { path:'user', component: UserModule },
            { path:'area', component: AreaModule },
            { path: '**', component: UserModule }
        ]
     },
];

