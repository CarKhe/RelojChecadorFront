import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-generic-datetime',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './generic-datetime.html',
  styleUrl: './generic-datetime.scss',
})
export class GenericDatetime {
  @Input() label: string = '';
  @Input() controlName!: string; // Nombre del FormControl dentro del FormGroup

  constructor(public controlContainer: ControlContainer) {}

  get control(): FormControl {
    return this.controlContainer.control!.get(this.controlName) as FormControl;
  }

  updateTime(event: Event) {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);
    const currentValue = this.control.value ? new Date(this.control.value) : new Date();
    currentValue.setHours(hours);
    currentValue.setMinutes(minutes);
    this.control.setValue(currentValue);
  }

    
  get currentTime(): string {
    const date = this.control.value ? new Date(this.control.value) : null;
    if (!date) return '';
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
