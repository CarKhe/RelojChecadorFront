import { Injectable } from '@angular/core';
import { MenuNavbarDTO } from '../../DTOs/layout/menu-navbar.dto';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  
  getMenuItems(rol: string):MenuNavbarDTO[]{
    //sin api
    switch(rol){
      case "admin":
        return [
          { label: 'asistencias', icon: 'check_box', route: 'dashboard' },
          { label: 'mis asistencias', icon: 'list_alt', route: 'misAsistencias' },
          { label: 'areas', icon: 'map', route: 'area' },
          { label: 'usuarios', icon: 'assignment_ind', route: 'user' },
          { label: 'reloj', icon: 'check_box', route: 'time' }
        ];
      case "user":
        return [
          { label: 'reloj', icon: 'check_box', route: 'time' },
          { label: 'mis asistencias', icon: 'list_alt', route: 'misAsistencias' }
        ];
      default:
        return [];
    }

  }

}
