import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeClock } from "../../components/time-clock/time-clock";
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Geolocalizacion } from '../../../../core/services/geolocalizacion';

@Component({
  selector: 'app-time-clock-module',
  imports: [CommonModule,TimeClock,MatGridListModule ],
  templateUrl: './time-clock-module.html',
  styleUrl: './time-clock-module.scss',
})
export class TimeClockModule implements OnInit, OnDestroy {
  private timer: any;
  currentTime: Date = new Date();
  tamanioBoton: string = '';
  constructor(
    private breakpointObserver: BreakpointObserver,
    private geolocalizacion: Geolocalizacion) {}

  ngOnInit(): void {
      this.timer = setInterval(() => {
        this.currentTime = new Date();
    }, 1000);
    
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {

      if (result.breakpoints[Breakpoints.XSmall]) {
        this.tamanioBoton = 'chico';
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.tamanioBoton = 'mediano';
      } 
      else if (result.breakpoints[Breakpoints.Medium]) {
        this.tamanioBoton = 'mediano';
      } else {
        this.tamanioBoton = 'grande';
      }

    });
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  async registrarAsistencia(tipo: boolean){
    try{
      const pos = await this.geolocalizacion.obtenerUbicacion();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const datos = {
        tipo: tipo ? 'SALIDA' : 'ENTRADA',
        fecha: new Date(),
        latitud: lat,
        longitud: lon
      };
      console.log('Datos enviados:', datos);
    } catch(error){
       console.error('Error al obtener ubicación:', error);
    }
  }
  



}
