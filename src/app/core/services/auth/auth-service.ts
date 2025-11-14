import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormDTO } from '../../DTOs/auth/login-form.dto';


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private currentUser: { userName: string, role:string} | null = null;

  constructor(private router: Router){}

  login(dto: LoginFormDTO): boolean {
    const { username, password } = dto;

    if (username === 'admin' && password === '1234') {
      this.currentUser = { userName: username, role: 'admin' };
    } else if (username === 'user' && password === '1234') {
      this.currentUser = { userName: username, role: 'user' };
    } else {
      return false;
    }

    localStorage.setItem('user', JSON.stringify(this.currentUser));
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  getUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      if (stored) this.currentUser = JSON.parse(stored);
    }
    return this.currentUser;
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

}
