import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { GenericButton } from '../../../shared/components/generic-button/generic-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, GenericButton],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  constructor(private router: Router) {}

  @Output() toggleSidenav = new EventEmitter<void>();
  
  title: string = "Generic Components";

  logout(){
     this.router.navigate(['/auth']);
  }
}
