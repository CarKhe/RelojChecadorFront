import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormDTO } from '../../DTOs/auth/login-form.dto';
import { AuthUserDTO } from '../../DTOs/auth/auth-user.dto';
import { createFakeJWT, decodeJWT, isTokenExpired } from '../utils/jwt-test';


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private currentUser: AuthUserDTO | null = null;

  constructor(private router: Router){
    const raw = localStorage.getItem('auth');
    if (raw) this.currentUser = JSON.parse(raw);
  }

  login(dto: LoginFormDTO): boolean {

    if((dto.username === 'admin' || dto.username === 'user') && dto.password === '1234'){
      const role = dto.username === 'admin' ? 'admin' : 'user';
      const payload = { sub: dto.username, role };
      const token = createFakeJWT(payload, 60 * 30); // 30 min por ejemplo

      this.currentUser = { username: dto.username, role, token };
      localStorage.setItem('auth', JSON.stringify(this.currentUser));
      return true;
    }
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('auth');
    this.router.navigate(['/auth']);
  }

  getToken(): string | null {
    return this.currentUser?.token ?? null;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = decodeJWT(token);
      return payload?.role ?? this.currentUser?.role ?? null;
    }
    return this.currentUser?.role ?? null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  refreshToken(): boolean {
    const token = this.getToken();
    if (!token || isTokenExpired(token)) return false;
    const payload = decodeJWT(token);
    const newToken = createFakeJWT({ sub: payload.sub, role: payload.role }, 60 * 30);
    if (this.currentUser) {
      this.currentUser.token = newToken;
      localStorage.setItem('auth', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }


  // getUser() {
  //   if (!this.currentUser) {
  //     const stored = localStorage.getItem('auth');
  //     if (stored) this.currentUser = JSON.parse(stored);
  //   }
  //   return this.currentUser;
  // }

}
