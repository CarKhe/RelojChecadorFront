import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-time-clock',
  imports: [MatButtonModule,MatToolbarModule],
  templateUrl: './time-clock.html',
  styleUrl: './time-clock.scss',
})
export class TimeClock {
  asistiendo = false;
  

  registrarAsistencia() {
    this.asistiendo = !this.asistiendo;
  }
}
