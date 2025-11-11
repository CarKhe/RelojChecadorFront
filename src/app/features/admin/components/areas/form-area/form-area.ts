import { Component } from '@angular/core';
import { Mapa } from '../../../../shared/components/mapa/mapa';
import { GenericSlider } from "../../../../../shared/components/generic-slider/generic-slider";
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericInput } from "../../../../../shared/components/generic-input/generic-input";

@Component({
  selector: 'app-form-area',
  imports: [Mapa, ReactiveFormsModule, GenericButton, GenericCard, GenericInput, GenericSlider],
  templateUrl: './form-area.html',
  styleUrl: './form-area.scss',
})
export class FormArea {
  LATITUD: number = 0;
  LONGITUD: number = 0;
  RADIO = 10; 
  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: [''],
      descripcion: [''],
      latitud: [this.LATITUD],
      longitud: [this.LONGITUD],
      radio: [this.RADIO]
    });
  }

   recibirCoordenadas(coords: { lat: number; lng: number }) {
    this.LATITUD = coords.lat;
    this.LONGITUD = coords.lng;
    this.formulario.patchValue({ latitud: coords.lat, longitud: coords.lng });
  }

  onSliderChange(value: number) {
    this.RADIO = value;
    this.formulario.patchValue({ radio: value });
  }


  guardar() {
    console.log('Datos del formulario:', this.formulario.value);
  }
}
