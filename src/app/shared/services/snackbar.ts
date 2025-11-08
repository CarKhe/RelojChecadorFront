import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericSnackbar, SnackbarData } from '../components/generic-snackbar/generic-snackbar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration: number = 3000) {
    const data: SnackbarData = { message, duration };
    this.snackBar.openFromComponent(GenericSnackbar, {
      data,
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'] // puedes definir un estilo global si quieres
    });
  }
}
