import { Component } from '@angular/core';
import { Mapa } from '../../../../shared/components/mapa/mapa';
import { GenericSlider } from "../../../../../shared/components/generic-slider/generic-slider";
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericInput } from "../../../../../shared/components/generic-input/generic-input";
import { AdminAreaService } from '../../../../../core/services/admin/admin-area-service';
import { AreaFormDTO } from '../../../../../core/DTOs/admin/area-form.dto';

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

  constructor(private fb: FormBuilder, private areaService: AdminAreaService) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      centroLat: [this.LATITUD],
      centroLon: [this.LONGITUD],
      radio: [this.RADIO]
    });
  }

   recibirCoordenadas(coords: { lat: number; lng: number }) {
    this.LATITUD = coords.lat;
    this.LONGITUD = coords.lng;
    this.formulario.patchValue({ centroLat: coords.lat, centroLon: coords.lng });
  }

  onSliderChange(value: number) {
    this.RADIO = value;
    this.formulario.patchValue({ radio: value });
  }


  guardar() {
    const areaForm: AreaFormDTO = this.formulario.value;
    this.areaService.postArea(areaForm).subscribe({
      next: (resp) =>{
        console.log('Area creado:', resp);
        this.formulario.reset(); 
      },
      error: (err) => {
        console.error('Error al crear Area', err);
      }
    });
  }
}
