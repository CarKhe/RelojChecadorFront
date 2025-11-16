import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../../shared/components/generic-table/generic-table";
import { AdminUserService } from '../../../../../core/services/admin/admin-user-service';
import { ColumnasDTO } from '../../../../../core/DTOs/shared/columnas.dto';
import { UserTableDTO } from '../../../../../core/DTOs/admin/user-form.dto';

@Component({
  selector: 'app-table-user',
  imports: [GenericCard, GenericTable],
  templateUrl: './table-user.html',
  styleUrl: './table-user.scss',
})
export class TableUser implements OnInit {
  columnas:ColumnasDTO[] = [];
  usuarios: UserTableDTO[] = [];
  @Output() enviarEditar = new EventEmitter<UserTableDTO>();
  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    this.userService.getColumns().subscribe(data => this.columnas = data);
    this.cargarUsuarioAPI();
  }

  cargarUsuarioAPI(){
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  editar(usuario: UserTableDTO) {
    this.enviarEditar.emit(usuario);
  }

  eliminar(usuario: UserTableDTO) {
    console.log('Eliminar', usuario);
  }
}
