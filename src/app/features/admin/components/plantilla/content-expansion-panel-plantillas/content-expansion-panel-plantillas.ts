import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-expansion-panel-plantillas',
  imports: [],
  templateUrl: './content-expansion-panel-plantillas.html',
  styleUrl: './content-expansion-panel-plantillas.scss',
})
export class ContentExpansionPanelPlantillas {
  @Input() idPlantilla: number = 0;

  horarioDias:any = [{
      dias: "Luneas a Viernes:",
      horario: "08:00am - 05:00pm",
      descanso: "01:00pm - 02:00pm"
    },{
      dias: "Sabado:",
      horario: "08:00am - 01:00pm"  
    },
    {
      dias: "Domingo:",
      horario: "Descanso"  
    }];

}
