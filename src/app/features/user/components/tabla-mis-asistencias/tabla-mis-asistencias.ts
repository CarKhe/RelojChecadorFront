import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../../../core/services/admin/admin-dashboard-service';
import { UsuariosUltimosRegistrosDTO } from '../../../../core/DTOs/admin/usuarios-ultimos-registros.dto';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { UserAuthDTO } from '../../../../core/DTOs/auth/auth-user.dto';
import { GenericCard } from "../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../shared/components/generic-table/generic-table";
import { ColumnasDTO } from '../../../../core/DTOs/shared/columnas.dto';

@Component({
  selector: 'app-tabla-mis-asistencias',
  imports: [GenericCard, GenericTable],
  templateUrl: './tabla-mis-asistencias.html',
  styleUrl: './tabla-mis-asistencias.scss',
})
export class TablaMisAsistencias implements OnInit {
  usuarios:UsuariosUltimosRegistrosDTO[] = [];
  userData: UserAuthDTO | null = null;
  columnas:ColumnasDTO[] = [];

  constructor( 
    private  serviceDashboard: AdminDashboardService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.auth.getUserData();
    if (!this.userData){ this.auth.logout(); return; }
    this.getMyAsistencias(5,this.userData.idUser);
    this.serviceDashboard.getColumnas().subscribe(data => this.columnas = data);
  }

  getMyAsistencias(cant: number, idUser: number){
      this.serviceDashboard.GetMisAsistencias(cant, idUser).subscribe({
        next: (data) =>{
          this.usuarios = [];
          this.usuarios = data
          console.log(data);
        },
        error: (err) =>{
          console.error("Error: "+err);
        }
    });
  }

}
