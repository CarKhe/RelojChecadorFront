import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { ContentExpansionPanelPlantillas } from "../content-expansion-panel-plantillas/content-expansion-panel-plantillas";

@Component({
  selector: 'app-mostrar-plantillas',
  imports: [GenericCard, MatExpansionModule, MatIconModule, GenericButton, ContentExpansionPanelPlantillas],
  templateUrl: './mostrar-plantillas.html',
  styleUrl: './mostrar-plantillas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostrarPlantillas {
  readonly panelOpenState = signal(false);

  ejemplosHorarioPlantilla:any = [ 
    { idPlantilla: 1, plantilla: 'MATUTINO CR'},
    { idPlantilla: 2, plantilla: 'MATUTINO FASCO' } ];

  editar(){
    alert("MAAMAMAAM");
  }
  
}
