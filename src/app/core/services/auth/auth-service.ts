import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormDTO } from '../../DTOs/auth/login-form.dto';
import { createFakeJWT, decodeJWT, isTokenExpired } from '../utils/jwt-test';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponseDTO } from '../../DTOs/auth/auth-user.dto';


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private currentUser: AuthResponseDTO | null = null;

  constructor(private router: Router, private http: HttpClient){
    const raw = localStorage.getItem('auth');
    if (raw) this.currentUser = JSON.parse(raw);
  }
  private apiRoute = environment.API_ROUTE + "Auth";

  login(dto: LoginFormDTO): Observable<boolean> {
    return this.http.post<AuthResponseDTO>(`${this.apiRoute}/login`, dto).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
        return true;
      }),
      catchError(() => of(false))
    );
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
      return payload?.role ?? this.currentUser?.user.role ?? null;
    }
    return this.currentUser?.user.role ?? null;
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




}
