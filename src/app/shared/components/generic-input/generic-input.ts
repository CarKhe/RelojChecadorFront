import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-generic-input',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './generic-input.html',
  styleUrl: './generic-input.scss',
})
export class GenericInput {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() controlName!: string;// nombre del control dentro del formGroup

    // Obtener el control del formGroup padre
  constructor(private rootFormGroup: FormGroupDirective) {}

  get control(): FormControl {
    return this.rootFormGroup.control.get(this.controlName) as FormControl;
  }

}
