import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../../shared/components/generic-table/generic-table";
import { AdminDashboardService } from '../../../../../core/services/admin/admin-dashboard-service';
import { UsuariosUltimosRegistrosDTO } from '../../../../../core/DTOs/admin/usuarios-ultimos-registros.dto';
import { ColumnasDTO } from '../../../../../core/DTOs/shared/columnas.dto';
import { interval, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-last-registers-table',
  imports: [GenericCard, GenericTable],
  templateUrl: './last-registers-table.html',
  styleUrl: './last-registers-table.scss',
})
export class LastRegistersTable implements OnInit, OnDestroy {
  usuarios:UsuariosUltimosRegistrosDTO[] = [];
  columnas:ColumnasDTO[] = [];
  private subscription!: Subscription;

  constructor( private  serviceDashboard: AdminDashboardService) {}

  ngOnInit(): void {
    this.serviceDashboard.getUsuarios().subscribe(data => this.usuarios = data);
    this.serviceDashboard.getColumnas().subscribe(data => this.columnas = data);

    // Actualizar cada 10 segundos la tabla si existe cambio en la grafica
    this.subscription = interval(10000)
      .pipe(switchMap(() => this.serviceDashboard.getUsuarios()))
      .subscribe({
        next: (nuevosUsuarios) => this.detectarCambios(nuevosUsuarios),
        error: (err) => console.error('Error en actualización:', err)
      });

  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private detectarCambios(nuevosUsuarios: UsuariosUltimosRegistrosDTO[]): void {
    const actual = JSON.stringify(this.usuarios);
    const nuevo = JSON.stringify(nuevosUsuarios);

    // Solo actualiza si hay diferencias reales
    if (actual !== nuevo) {
      console.log('Cambios detectados, actualizando tabla...');
      this.usuarios = nuevosUsuarios;
    } 
  }

}
