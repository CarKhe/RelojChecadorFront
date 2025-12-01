import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormDTO } from '../../DTOs/auth/login-form.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponseDTO } from '../../DTOs/auth/auth-user.dto';
import { jwtDecode } from 'jwt-decode';


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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  getToken(): string | null {
    return this.currentUser?.token ?? null;
  }

  getRole(): string | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    const user = JSON.parse(userJson);
    return user.rol ?? null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;

      if (!exp) return true;

      const now = Math.floor(Date.now() / 1000);

      return exp < now;
    } 
    catch (err) {
      return true;
    }
  }


}


