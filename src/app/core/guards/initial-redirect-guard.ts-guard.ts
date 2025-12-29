import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const initialRedirectGuardTsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    router.navigate(['/auth']);
    return false;
  }
  const parsedUser = JSON.parse(user);
  console.log(parsedUser);
  switch (parsedUser.role) {
    case 'admin':
      router.navigate(['/admin']);
      break;
    case 'master':
      router.navigate(['/master']);
      break;

    case 'user':
      router.navigate(['/user']);
      break;

    default:
      router.navigate(['/auth']);
      break;
  }
  return true;
};
