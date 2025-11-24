import { AfterViewInit, Component, EventEmitter, input, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.scss'
})
export class Mapa implements AfterViewInit, OnChanges {

  private map!: L.Map;
  private miUbicacion!: L.Marker;
  private circle!: L.Circle;
  @Input() LATITUD: number = 0;
  @Input() LONGITUD: number = 0;
  @Input() RADIO: number = 50;
  @Output() coordenadasChange = new EventEmitter<{lat: number, lng: number}>();

  ngAfterViewInit(): void {
    this.initMap();
    this.getCurrentLocation();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private initMap(): void {
     this.map = L.map('map', {
      center: [this.LATITUD, this.LONGITUD], 
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
