import { Component } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../../shared/components/generic-table/generic-table";

@Component({
  selector: 'app-table-user',
  imports: [GenericCard, GenericTable],
  templateUrl: './table-user.html',
  styleUrl: './table-user.scss',
})
export class TableUser {
  usuarios = [
    { id: 1, nombre: 'Carlos', correo: '585@mail.com', rol: 'Admin' },
    { id: 2, nombre: 'Ana', correo: 'ana@mail.com', rol: 'Usuario' },
    { id: 3, nombre: 'Julian', correo: 'julian@mail.com', rol: 'Usuario' },
    { id: 4, nombre: 'Tulio', correo: 'tulio@mail.com', rol: 'Usuario' },
  ];

  columnas = [
    { field: 'id', label: 'ID' },
    { field: 'nombre', label: 'Nombre' },
    { field: 'correo', label: 'Correo' },
    { field: 'rol', label: 'Rol' },
  ];

  editar(usuario: any) {
    console.log('Editar', usuario);
  }

  eliminar(usuario: any) {
    console.log('Eliminar', usuario);
  }
}
