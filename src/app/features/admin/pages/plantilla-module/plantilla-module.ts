import { Component } from '@angular/core';
import { MostrarPlantillas } from "../../components/plantilla/mostrar-plantillas/mostrar-plantillas";

@Component({
  selector: 'app-plantilla-module',
  imports: [MostrarPlantillas],
  templateUrl: './plantilla-module.html',
  styleUrl: './plantilla-module.scss',
})
export class PlantillaModule {

}
