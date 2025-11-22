import { Component } from '@angular/core';
import { FormArea } from "../../components/areas/form-area/form-area";
import { TableArea } from "../../components/areas/table-area/table-area";

@Component({
  selector: 'app-area-module',
  imports: [FormArea, TableArea],
  templateUrl: './area-module.html',
  styleUrl: './area-module.scss',
})
export class AreaModule {

}
