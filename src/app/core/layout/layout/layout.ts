import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SideNav } from "../side-nav/side-nav";
import { Toolbar } from "../toolbar/toolbar";
import { GenericAvatarDisplay } from "../../../shared/components/generic-avatar-display/generic-avatar-display";
import { AuthService } from '../../services/auth/auth-service';
import { UserAuthDTO } from '../../DTOs/auth/auth-user.dto';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, RouterOutlet, SideNav, Toolbar, GenericAvatarDisplay],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  opened = false;
  userData: UserAuthDTO | null = null;
  userName: string = '';

  constructor( private auth: AuthService) {}
  ngOnInit(): void {
    this.userData = this.auth.getUserData();
    if (!this.userData){ this.auth.logout(); return; }
    this.userName = this.userData?.nombre;

  }
}
