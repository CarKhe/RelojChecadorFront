import { Component } from '@angular/core';
import { FormArea } from "../../components/areas/form-area/form-area";

@Component({
  selector: 'app-area-module',
  imports: [FormArea],
  templateUrl: './area-module.html',
  styleUrl: './area-module.scss',
})
export class AreaModule {

}
