import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormDTO } from '../../DTOs/auth/login-form.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponseDTO, UserAuthDTO } from '../../DTOs/auth/auth-user.dto';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private currentUser: AuthResponseDTO | null = null;

  constructor(private router: Router, private http: HttpClient){
    const raw = localStorage.getItem('auth');
    if (raw) this.currentUser = JSON.parse(raw);
  }
  private apiRoute = environment.API_ROUTE + "Auth";

  login(dto: LoginFormDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiRoute}/login`, dto).pipe(
      tap(resp => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
      })
    );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.getItem('deviceUUID');
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

  getUserData():UserAuthDTO | null{
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    return userJson ? JSON.parse(userJson) as UserAuthDTO : null;
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


