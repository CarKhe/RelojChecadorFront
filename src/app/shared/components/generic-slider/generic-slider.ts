import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-generic-slider',
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule,FormsModule ],
  templateUrl: './generic-slider.html',
  styleUrl: './generic-slider.scss',
})
export class GenericSlider {
  @Input() label: string = '';
  @Input() unit: string = '';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 10;
  @Input() disabled: boolean = false;
  @Input() thumbLabel: boolean = false;
  @Input() showTicks: boolean = false;
  @Input() value: number = 50;

  @Output() valueChange = new EventEmitter<number>();

  onValueChange(newValue: number) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
