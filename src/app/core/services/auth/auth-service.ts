import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'app_token';
  private readonly ROLE_KEY = 'app_token_role';

  constructor(private router: Router) {}

  // login(username: string, password:string):LoginResult{
  //   if (username === 'admin' && password === '1234') {
  //     localStorage.setItem(this.TOKEN_KEY,'fake-jwt-token');
  //     localStorage.setItem(this.ROLE_KEY, 'admin');
  //     return { success: true, role: 'admin' };
  //   }
  //   if (username === 'user' && password === '5678') {
  //     localStorage.setItem(this.TOKEN_KEY,'fake-jwt-token');
  //     localStorage.setItem(this.ROLE_KEY, 'user');
  //     return { success: true, role: 'user' };
  //   }
  //   return { success: false, role: '' };
  // }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY) && !!localStorage.getItem(this.ROLE_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
}
