import { Component, OnInit } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../../shared/components/generic-table/generic-table";

@Component({
  selector: 'app-last-registers-table',
  imports: [GenericCard, GenericTable],
  templateUrl: './last-registers-table.html',
  styleUrl: './last-registers-table.scss',
})
export class LastRegistersTable {

  usuarios = [
    { empleado: 'Carlos Rodriguez', area: 'FASCO', hora: '10:00 am'},
    { empleado: 'PEDRO PUENTE', area: 'CR', hora: '09:54 am' },
    { empleado: 'ALFREDO SOLIS', area: 'JACKEL', hora: '09:50 am'},
    { empleado: 'MARIO TREJO', area: 'FASCO', hora: '09:44 am' },
  ];

  columnas = [
    { field: 'empleado', label: 'EMPLEADO' },
    { field: 'area', label: 'AREA' },
    { field: 'hora', label: 'HORA' },
  ];

}
