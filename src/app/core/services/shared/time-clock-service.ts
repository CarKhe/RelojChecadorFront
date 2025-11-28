import { Injectable } from '@angular/core';
import { RegistroAsistenciaDTO } from '../../DTOs/shared/registro-asistencia.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeClockService {

  constructor(private http: HttpClient){}
  private apiRoute = environment.API_ROUTE + "Asistencia";
  
  enviarDatos(datos: RegistroAsistenciaDTO):Observable<any>{
    return this.http.post<RegistroAsistenciaDTO>(this.apiRoute,datos);
  }

  statusAnterior():boolean{
    return true;
  }

  statusDeshabilitado():boolean{
    return false;
  }
}
