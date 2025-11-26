import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  private open(message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`] // clase dinámica según el tipo
    });
  }

  // Métodos pequeños para comodidad
  success(msg: string) { this.open(msg, 'success'); }
  error(msg: string) { this.open(msg, 'error'); }
  warning(msg: string) { this.open(msg, 'warning'); }
  info(msg: string) { this.open(msg, 'info'); }
}
