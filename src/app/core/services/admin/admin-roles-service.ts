import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { RolesDTO } from '../../DTOs/admin/roles.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminRolesService {
  constructor(private http: HttpClient){}
  private apiRoute = environment.API_ROUTE + "Roles"

  rolLocal: RolesDTO[] = [
    { idRol: 1, rol: 'admin' },
    { idRol: 2, rol: 'usuario' }
  ];

  getRoles():Observable<RolesDTO[]>{
    return of(this.rolLocal); //local
    //return this.http.get<RolesDTO[]>(this.apiRoute); //api
  }
}
