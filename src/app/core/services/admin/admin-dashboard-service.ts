import { Injectable } from '@angular/core';
import { RangoFechasDescargaDTO } from '../../DTOs/admin/rango-fechas-descarga.dto';
import { Observable, of } from 'rxjs';
import { UsuariosUltimosRegistrosDTO } from '../../DTOs/admin/usuarios-ultimos-registros.dto';
import { ColumnasDTO } from '../../DTOs/shared/columnas.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private usuarios: UsuariosUltimosRegistrosDTO[] = [
    { empleado: 'Carlos Rodriguez', area: 'FASCO', hora: '10:00 am' },
    { empleado: 'PEDRO PUENTE', area: 'CR', hora: '09:54 am' },
    { empleado: 'ALFREDO SOLIS', area: 'JACKEL', hora: '09:50 am' },
    { empleado: 'MARIO TREJO', area: 'FASCO', hora: '09:44 am' },
  ];

  private columnas: ColumnasDTO[] = [
    { field: 'empleado', label: 'EMPLEADO' },
    { field: 'area', label: 'AREA' },
    { field: 'hora', label: 'HORA' },
  ];
  
  descargar(rangoFechas: RangoFechasDescargaDTO){
    console.log(rangoFechas);
  }
    
  getUsuarios(): Observable<UsuariosUltimosRegistrosDTO[]> {
    return of(this.usuarios);
  }

  
  getColumnas(): Observable<ColumnasDTO[]> {
    return of(this.columnas);
  }
}
