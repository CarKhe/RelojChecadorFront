import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data['roles'] as string[]; 
  const userRole = auth.getRole();

  if (!auth.isAuthenticated()) {
    return router.parseUrl('/auth');
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole ?? '')) {
    return router.parseUrl('/' + (userRole ?? 'auth'));
  }
  
  return true;
};
