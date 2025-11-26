import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../../shared/components/generic-table/generic-table";
import { AdminUserService } from '../../../../../core/services/admin/admin-user-service';
import { ColumnasDTO } from '../../../../../core/DTOs/shared/columnas.dto';
import { UserTableDTO } from '../../../../../core/DTOs/admin/user-form.dto';
import { SnackbarService } from '../../../../../shared/services/snackbar';
import { LoaderService } from '../../../../../shared/services/loader-service';

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
  constructor(private userService: AdminUserService,
              private snackBar: SnackbarService,
              private loader: LoaderService) {}

  ngOnInit(): void {
    this.userService.getColumns().subscribe(data => this.columnas = data);
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.loader.show();
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = [];
        this.usuarios = data;
        this.loader.hide();
      },
      error: (err) => {
        this.loader.hide();
        this.snackBar.error(err.message);
      }
    });
  }

  editar(usuario: UserTableDTO) {
    this.enviarEditar.emit(usuario);
  }

  eliminar(usuario: UserTableDTO) {
    this.userService.softDeleteUser(usuario.id).subscribe({
      next: (data) => {
        console.log("Deshabilitado:" + data);
      },
      error: (err) => {
        console.error('Error al Deshabilitar', err);
      }
    });
  }
}
