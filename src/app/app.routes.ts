import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth-routing-module').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./features/admin/admin-routing-module').then(m => m.ADMIN_ROUTES)
    },
];
