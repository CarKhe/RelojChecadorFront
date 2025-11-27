import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericTable } from "../../../../../shared/components/generic-table/generic-table";
import { ColumnasDTO } from '../../../../../core/DTOs/shared/columnas.dto';
import { AreaTableDTO } from '../../../../../core/DTOs/admin/area-form.dto';
import { AdminAreaService } from '../../../../../core/services/admin/admin-area-service';

@Component({
  selector: 'app-table-area',
  imports: [GenericCard, GenericTable],
  templateUrl: './table-area.html',
  styleUrl: './table-area.scss',
})
export class TableArea implements OnInit {
    columnas:ColumnasDTO[] = [];
    areas: AreaTableDTO[] = [];
    @Output() sendToEdit = new EventEmitter<AreaTableDTO>;

  constructor(private areaService: AdminAreaService) {}
  ngOnInit(): void {
    this.areaService.getColumns().subscribe(data => this.columnas = data);
    this.getAreas();
  }

  getAreas(){
    this.areaService.getAreas().subscribe({
      next: (data) =>{
        this.areas = [];
        this.areas = data;
      },
      error: (err) => {
        console.error("Error en :",err);
      }
    });
  }

  editar(area: AreaTableDTO){
    this.sendToEdit.emit(area);
  }

  eliminar(area: AreaTableDTO){
    this.areaService.toogleAreas(area.id).subscribe({
      next: (data) =>{
        console.log("Toogle: " +data);
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }

}
