import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { UppercasePipePipe } from "../../../shared/pipes/uppercase-pipe";

@Component({
  selector: 'app-side-nav',
  imports: [MatListModule, RouterModule, MatIconModule, UppercasePipePipe],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {

  menuItems = [
    { label: 'asistencias', icon: 'check_box', route: 'buttons' },
    { label: 'areas', icon: 'map', route: 'area' },
    { label: 'usuarios', icon: 'assignment_ind', route: 'user' },
    { label: 'reloj', icon: 'check_box', route: 'time' },
  ];
}
