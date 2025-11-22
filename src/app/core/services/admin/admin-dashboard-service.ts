import { Injectable } from '@angular/core';
import { RangoFechasDescargaDTO } from '../../DTOs/admin/rango-fechas-descarga.dto';
import { Observable, of } from 'rxjs';
import { UsuariosUltimosRegistrosDTO } from '../../DTOs/admin/usuarios-ultimos-registros.dto';
import { ColumnasDTO } from '../../DTOs/shared/columnas.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {

  private columnas: ColumnasDTO[] = [
    { field: 'usuario', label: 'EMPLEADO' },
    { field: 'area', label: 'AREA' },
    { field: 'movimiento', label: 'Movimiento' },
    { field: 'dentroZona', label: 'Zona' },
    { field: 'fechaHora', label: 'Hora' },
  ];

  constructor(private http: HttpClient) {}
  private apiRoute = environment.API_ROUTE + "Asistencia";
  
  descargar(rangoFechas: RangoFechasDescargaDTO){
    console.log(rangoFechas);
  }
    
  GetLastAsistencia(cant: number): Observable<UsuariosUltimosRegistrosDTO[]> {
    return this.http.get<UsuariosUltimosRegistrosDTO[]>(`${this.apiRoute}/last/${cant}`);
  }

  
  getColumnas(): Observable<ColumnasDTO[]> {
    return of(this.columnas);
  }
}
