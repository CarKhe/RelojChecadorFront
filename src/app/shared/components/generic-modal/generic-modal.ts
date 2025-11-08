import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GenericButton } from '../generic-button/generic-button';

export interface ModalData {
  title: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-generic-modal',
  imports: [CommonModule, MatDialogModule, GenericButton],
  templateUrl: './generic-modal.html',
  styleUrl: './generic-modal.scss',
})
export class GenericModal {

  constructor(
    public dialogRef: MatDialogRef<GenericModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

}
