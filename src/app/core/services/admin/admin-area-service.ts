import { Injectable } from '@angular/core';
import { AreaFormDTO, AreaTableDTO } from '../../DTOs/admin/area-form.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { ColumnasDTO } from '../../DTOs/shared/columnas.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminAreaService {

  private columnas: ColumnasDTO[] = [
      { field: 'id', label: 'ID' },
      { field: 'nombre', label: 'Area' },
      { field: 'descripcion', label: 'Descripcion' },
      { field: 'centroLat', label: 'Latitud' },
      { field: 'centroLon', label: 'Longitud' },
      { field: 'radio', label: 'Radio' },
      { field: 'fechaCreacion', label: 'Fecha Creacion' },
  ];

  constructor(private http: HttpClient) {}
  private apiRoute = environment.API_ROUTE + "Area";

  getColumns(): Observable<ColumnasDTO[]>{
    return of(this.columnas);
  }

  getAreas(): Observable<AreaTableDTO[]> {
    return this.http.get<AreaTableDTO[]>(this.apiRoute);
  }
  
  postArea(areaForm: AreaFormDTO):Observable<any>{
    return this.http.post<AreaFormDTO>(this.apiRoute, areaForm);
  }
}
