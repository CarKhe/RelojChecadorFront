import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: AdminUserService) {}

  ngOnInit(): void {
    this.userService.getColumns().subscribe(data => this.columnas = data);
    this.userService.getUsers().subscribe(data => this.usuarios = data);
  }

  editar(usuario: UserTableDTO) {
    console.log('Editar', usuario);
  }

  eliminar(usuario: UserTableDTO) {
    console.log('Eliminar', usuario);
  }
}
