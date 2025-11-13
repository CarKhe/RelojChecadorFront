import { Injectable } from '@angular/core';
import { RolesDTO } from '../../DTOs/admin/roles.dto';
import { Observable, of } from 'rxjs';
import { UserFormDTO, UserTableDTO } from '../../DTOs/admin/user-form.dto';
import { ColumnasDTO } from '../../DTOs/shared/columnas.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private roles: RolesDTO[] = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Usuario' }
  ];

  private columnas: ColumnasDTO[] = [
    { field: 'id', label: 'ID' },
    { field: 'nombre', label: 'Nombre' },
    { field: 'telefono', label: 'Telefono' },
    { field: 'rol', label: 'Rol' },
  ];

  private usuarios: UserTableDTO[] = [
    { id: 1, nombre: 'Carlos', telefono: '585@mail.com', rol: 'Admin' },
    { id: 2, nombre: 'Ana', telefono: 'ana@mail.com', rol: 'Usuario' },
    { id: 3, nombre: 'Julian', telefono: 'julian@mail.com', rol: 'Usuario' },
    { id: 4, nombre: 'Tulio', telefono: 'tulio@mail.com', rol: 'Usuario' },
  ];

  getRoles(): Observable<RolesDTO[]>{
    return of(this.roles);
  }

  getColumns(): Observable<ColumnasDTO[]>{
    return of(this.columnas);
  }

  getUsers(): Observable<UserTableDTO[]>{
    return of(this.usuarios);
  }

  guardarUsuario(userForm: UserFormDTO){
    console.log(userForm);
  }

  setToModificar(userToMod: UserTableDTO): UserFormDTO{
    //Consulta en la base de datos
    console.log(userToMod);

    //Retorno del cliente con los campos que puede cambiar
    const userFormMod: UserFormDTO = {
      id: userToMod.id, 
      nombre: userToMod.nombre,
      telefono: userToMod.telefono,
      contraseña: "123contra",
      rol: 1
    }
    
    return userFormMod;
  }

}
