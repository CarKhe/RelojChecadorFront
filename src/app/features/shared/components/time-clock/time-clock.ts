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
  @Input()  deshabilitado = false;
  @Input() asistenciaStatus = true;
  @Output() clickBoton = new EventEmitter<boolean>();

  registrarAsistencia() {
    this.asistenciaStatus = !this.asistenciaStatus;
    this.clickBoton.emit(this.asistenciaStatus);
  }

  envioStatusBoton(){
    
  }

}
