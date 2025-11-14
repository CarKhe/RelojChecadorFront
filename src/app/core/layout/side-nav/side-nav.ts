import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { UppercasePipePipe } from "../../../shared/pipes/uppercase-pipe";
import { AuthService } from '../../services/auth/auth-service';
import { MenuNavbarDTO } from '../../DTOs/layout/menu-navbar.dto';
import { LayoutService } from '../../services/layout/layout-service';

@Component({
  selector: 'app-side-nav',
  imports: [MatListModule, RouterModule, MatIconModule, UppercasePipePipe],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav implements OnInit {
  
  rol: string = '';
  menuItems: MenuNavbarDTO[]= [];
  constructor(private authService: AuthService, private layoutService: LayoutService) {}

  ngOnInit(): void {
    const rol = this.authService.getRole();
    this.menuItems = this.getMenuNavBar(rol);
  }

  getMenuNavBar(rol: string | null):MenuNavbarDTO[]{
    if(rol){
      return this.layoutService.getMenuItems(rol);
    }
    return [];
  }

}
