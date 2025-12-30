import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeClock } from "../../components/time-clock/time-clock";
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Geolocalizacion } from '../../../../core/services/shared/geolocalizacion';
import { TimeClockService } from '../../../../core/services/shared/time-clock-service';
import { LastRegisterDTO, LastRegisterReturnDTO, RegistroAsistenciaDTO } from '../../../../core/DTOs/shared/registro-asistencia.dto';
import { SnackbarService } from '../../../../shared/services/snackbar';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { UserAuthDTO } from '../../../../core/DTOs/auth/auth-user.dto';
import { GenericLoader } from "../../../../shared/components/generic-loader/generic-loader";
import { LoaderService } from '../../../../shared/services/loader-service';

@Component({
  selector: 'app-time-clock-module',
  imports: [CommonModule, TimeClock, MatGridListModule, GenericLoader],
  templateUrl: './time-clock-module.html',
  styleUrl: './time-clock-module.scss',
})
export class TimeClockModule implements OnInit, OnDestroy {
  private timer: any;
  currentTime: Date = new Date();
  tamanioBoton: string = '';
  deshabilitado: boolean = false;
  asistenciaStatus: boolean = true;
  userData: UserAuthDTO | null = null;
  cargando = false;

  constructor(
    private loader: LoaderService,
    private breakpointObserver: BreakpointObserver,
    private geolocalizacion: Geolocalizacion,
    private timeClockService: TimeClockService,
    private snackBar: SnackbarService,
    private auth: AuthService ) {

      this.loader.loading$.subscribe(valor => {
        this.cargando = valor;
      });
    }

  ngOnInit(): void {
    this.cargando = true;
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

    this.userData = this.auth.getUserData();

    if (!this.userData){ this.auth.logout(); return; }
    
    const statusDTO: LastRegisterDTO = {
      idUsuario: this.userData.idUser
    }
    this.timeClockService.statusAnterior(statusDTO).subscribe({
      next: (result: LastRegisterReturnDTO) => {
        console.log(result);
        if (result.movimiento === 1) {
          this.asistenciaStatus = false;
          //Si no es hoy, entonces se registra como entrada
          this.asistenciaStatus = this.esHoy(result.date) ? false : true;
        }
        this.deshabilitado = this.pasoTiempo(result.date, 3) ? false : true;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
    
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  pasoTiempo(dateString: Date, minutos: number = 60): boolean {
    const pastDate = new Date(dateString);
    const now = new Date();
    // ignorar milisegundos
    pastDate.setMilliseconds(0);
    now.setMilliseconds(0);
    const diffMs = now.getTime() - pastDate.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    return diffMinutes >= minutos;
  }

  esHoy(fecha: Date): boolean {
    const f = new Date(fecha);
    const hoy = new Date();

    // Normalizar ambas fechas
    f.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
    return f.getTime() === hoy.getTime();
  }


  async registrarAsistencia(tipo: boolean){
    this.deshabilitado = true;
    this.cargando = true;
    try{
      const pos = await this.geolocalizacion.obtenerUbicacion();
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      if (!this.userData) return;
      const datos: RegistroAsistenciaDTO = {
        idUsuario: this.userData.idUser,
        idMovimiento: tipo ? 2 : 1,
        latitud: lat,
        longitud: lon,
        idArea: 0,
        dentroZona: 0
      };
      alert(JSON.stringify(datos));
      this.timeClockService.enviarDatos(datos).subscribe({
        next: (data) => {
          this.snackBar.success(data.mensaje);
        },
        error: (err) => {
          if (err.status === 400) {
            this.snackBar.error(err.error.errores[0] || 'Error desconocido');
            setTimeout(() => {
              window.location.reload();
            }, 2000); 
          } else {
            this.snackBar.error(err.message);
          }
        }
      });
    } catch(error){
       console.error('Error al obtener ubicación:', error);
    }
    this.cargando = false;
  }
  
}
