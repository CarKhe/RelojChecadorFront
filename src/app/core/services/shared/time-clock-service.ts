import { Injectable } from '@angular/core';
import { LastRegisterDTO, RegistroAsistenciaDTO } from '../../DTOs/shared/registro-asistencia.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserAuthDTO } from '../../DTOs/auth/auth-user.dto';

@Injectable({
  providedIn: 'root',
})
export class TimeClockService {

  constructor(private http: HttpClient){}
  private apiRoute = environment.API_ROUTE + "Asistencia";
  
  enviarDatos(datos: RegistroAsistenciaDTO):Observable<any>{
    return this.http.post<RegistroAsistenciaDTO>(this.apiRoute,datos);
  }

  statusAnterior(userData: LastRegisterDTO):Observable<any>{
    return this.http.post<LastRegisterDTO>(`${this.apiRoute}/lastStatus`,userData);
  }

  statusDeshabilitado():boolean{
    return false;
  }
}
