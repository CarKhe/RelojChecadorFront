import { Injectable } from '@angular/core';
import { RolesDTO } from '../../DTOs/admin/roles.dto';
import { Observable, of } from 'rxjs';
import { UserFormDTO, UserTableDTO } from '../../DTOs/admin/user-form.dto';
import { ColumnasDTO } from '../../DTOs/shared/columnas.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {

  private columnas: ColumnasDTO[] = [
    { field: 'id', label: 'ID' },
    { field: 'nombre', label: 'Nombre' },
    { field: 'telefono', label: 'Telefono' },
    { field: 'rol', label: 'Rol' },
  ];

  constructor(private http: HttpClient) {}
  private apiRoute = environment.API_ROUTE + "Usuarios";

  getUsers(): Observable<UserTableDTO[]> {
    return this.http.get<UserTableDTO[]>(this.apiRoute);
  }

  getColumns(): Observable<ColumnasDTO[]>{
    return of(this.columnas);
  }


  postUsuario(userForm: UserFormDTO):Observable<any>{
    return this.http.post<UserFormDTO>(this.apiRoute,userForm);
  }

  setToModificar(userToMod: UserTableDTO): UserFormDTO{
    //Consulta en la base de datos
    console.log(userToMod);

    //Retorno del cliente con los campos que puede cambiar
    const userFormMod: UserFormDTO = {
      id: userToMod.id, 
      nombre: userToMod.nombre,
      telefono: userToMod.telefono,
      passwordHash: "123contra",
      idrol: 1
    }
    
    return userFormMod;
  }

}
