import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Geolocalizacion {
  obtenerUbicacion(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('El navegador no soporta geolocalización');
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000
      });
    });
  }

  observarUbicacion(
    callback: (pos: GeolocationPosition) => void,
    errorCallback?: (error: GeolocationPositionError) => void
  ): number {
    if (!navigator.geolocation) {
      throw new Error('El navegador no soporta geolocalización');
    }

    return navigator.geolocation.watchPosition(callback, errorCallback, {
      enableHighAccuracy: true
    });
  }

  detenerObservacion(id: number): void {
    navigator.geolocation.clearWatch(id);
  }
  
}
