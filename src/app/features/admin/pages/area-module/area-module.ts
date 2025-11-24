import { Component, ViewChild } from '@angular/core';
import { FormArea } from "../../components/areas/form-area/form-area";
import { TableArea } from "../../components/areas/table-area/table-area";
import { AreaTableDTO } from '../../../../core/DTOs/admin/area-form.dto';

@Component({
  selector: 'app-area-module',
  imports: [FormArea, TableArea],
  templateUrl: './area-module.html',
  styleUrl: './area-module.scss',
})
export class AreaModule {
  areaMod?: AreaTableDTO;
  @ViewChild('tabla') tabla!: TableArea;

  ToModificar(area: AreaTableDTO){
    this.areaMod = {...area}
  }
  recargarTabla(){
    this.tabla.getAreas();
  }

}
