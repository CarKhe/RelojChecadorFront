import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackbarData {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // opcional
}

@Component({
  selector: 'app-generic-snackbar',
  imports: [],
  templateUrl: './generic-snackbar.html',
  styleUrl: './generic-snackbar.scss',
  encapsulation: ViewEncapsulation.None
})
export class GenericSnackbar {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {}
}
