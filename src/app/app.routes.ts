import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth-routing-module').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'user',
        canActivate: [authGuard,roleGuard],
        data: { role: 'user' },
        loadChildren: () =>
            import('./features/user/user-routing-module').then(m => m.USER_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [authGuard,roleGuard],
        data: { role: 'admin' },
        loadChildren: () =>
            import('./features/admin/admin-routing-module').then(m => m.ADMIN_ROUTES)
    },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];
