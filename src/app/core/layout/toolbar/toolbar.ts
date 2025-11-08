import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { GenericButton } from '../../../shared/components/generic-button/generic-button';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbar, GenericButton],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  @Output() toggleSidenav = new EventEmitter<void>();
  title: string = "Generic Components";
}
