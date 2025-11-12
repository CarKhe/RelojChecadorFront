import { Injectable } from '@angular/core';
import { RegistroAsistenciaDTO } from '../../DTOs/shared/registro-asistencia.dto';

@Injectable({
  providedIn: 'root',
})
export class TimeClockService {
  enviarDatos(datos: RegistroAsistenciaDTO){
    console.log(datos);
  }

  statusAnterior():boolean{
    return Math.random() < 0.5;
  }

  statusDeshabilitado():boolean{
    return Math.random() < 0.5;
  }
}
