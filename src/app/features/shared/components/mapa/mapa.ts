import { AfterViewInit, Component, EventEmitter, input, Input, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.scss'
})
export class Mapa implements AfterViewInit {
  private map!: L.Map;
  private miUbicacion!: L.Marker;
  private circle!: L.Circle;
  private LATITUD: number = 28.698210;
  private LONGITUD: number = -100.5145414;
  @Input() RADIO: number = 50;
  @Output() coordenadasChange = new EventEmitter<{lat: number, lng: number}>();
  ngAfterViewInit(): void {
    this.initMap();
    this.getCurrentLocation();
  }

  private initMap(): void {
     this.map = L.map('map', {
      center: [this.LATITUD, this.LONGITUD], // CDMX por defecto
      zoom: 15,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.LATITUD = e.latlng.lat; 
      this.LONGITUD = e.latlng.lng;
      this.coordenadasChange.emit({
        lat: this.LATITUD,
        lng: this.LONGITUD
      });
      if (this.circle) this.map.removeLayer(this.circle);

      this.circle = L.circle([this.LATITUD, this.LONGITUD], {
        radius: this.RADIO, // metros
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.3
      }).addTo(this.map);
    });
     
  }

 
  private getCurrentLocation(): void {
    
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(
      // (position: GeolocationPosition)=> {
      //   this.LATITUD = position.coords.latitude;
      //   this.LONGITUD = position.coords.longitude;
      //   const marcador = L.marker([this.LATITUD,  this.LONGITUD])
      //   .addTo(this.map)               
      //   .bindPopup('📍 Mi ubicación actual')
      //   .openPopup();
      // });
      this.map.setView([this.LATITUD, this.LONGITUD], 16);
      
    }
  }
  
}
