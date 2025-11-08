import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-generic-select',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './generic-select.html',
  styleUrl: './generic-select.scss',
})
export class GenericSelect {
  @Input() label: string = '';
  @Input() controlName!: string; // nombre del control en el formGroup
  @Input() options: any[] = [];  // array de objetos con opciones
  @Input() displayField: string = ''; // campo que se muestra
  @Input() valueField: string = '';   // campo que se usa como valor

  constructor(public controlContainer: ControlContainer) {}

get control(): FormControl {
  return this.controlContainer.control!.get(this.controlName) as FormControl;
}

}
