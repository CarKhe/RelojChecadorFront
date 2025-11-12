import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { GenericButton } from '../../../shared/components/generic-button/generic-button';
import { Router } from '@angular/router';
import { UppercasePipePipe } from "../../../shared/pipes/uppercase-pipe";
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, GenericButton, UppercasePipePipe],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  constructor(private router: Router) {}

  @Output() toggleSidenav = new EventEmitter<void>();
  
  title: string =  environment.appTitle;

  logout(){
     this.router.navigate(['/auth']);
  }
}
