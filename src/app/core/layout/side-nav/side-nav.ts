import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [MatListModule,RouterModule,MatIconModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  menuItems = [
    { label: 'Buttons', icon: 'radio_button_checked', route: '/buttons' },
    { label: 'Inputs', icon: 'rectangle', route: '/inputs' },
    { label: 'Form', icon: 'dashboard', route: '/form' },
    { label: 'Modal', icon: 'people', route: '/modal' },
    { label: 'Snackbar', icon: 'settings', route: '/snackbar' },
    { label: 'Tabla', icon: 'settings', route: '/tabla' },
  ];
}
