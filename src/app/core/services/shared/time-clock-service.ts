import { Injectable } from '@angular/core';
import { RegistroAsistenciaDTO } from '../../DTOs/shared/registro-asistencia.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimeClockService {

  constructor(private http: HttpClient){}
  
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
