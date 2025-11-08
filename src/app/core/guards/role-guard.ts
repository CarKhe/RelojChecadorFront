import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];
  const userRole = auth.getUserRole();

  if (!auth.isAuthenticated()) {
    return router.parseUrl('/auth');
  }
  
  if (expectedRole && userRole !== expectedRole) {
    return router.parseUrl('/'+userRole);
  }
  return true;
};
