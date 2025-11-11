import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-time-clock',
  imports: [CommonModule,MatButtonModule, MatToolbarModule],
  templateUrl: './time-clock.html',
  styleUrl: './time-clock.scss',
})
export class TimeClock {
  @Input() tamano: string = '';
  @Output() clickBoton = new EventEmitter<boolean>();
  asistiendo = true;
  

  registrarAsistencia() {
    this.asistiendo = !this.asistiendo;
    this.clickBoton.emit(this.asistiendo);
  }

}
