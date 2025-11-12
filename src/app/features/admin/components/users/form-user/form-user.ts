import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericInput } from "../../../../../shared/components/generic-input/generic-input";
import { GenericSelect } from "../../../../../shared/components/generic-select/generic-select";
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-user',
  imports: [GenericCard, GenericInput, 
    GenericSelect, GenericButton,
    MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.scss',
})
export class FormUser {
  formulario: FormGroup;

  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Usuario' }
  ];

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: [''],
      telefono: [''],
      contraseña: [''],
      rol: ['']
    });
  }
  guardar() {
    const resultado = this.formulario.value;
    console.log('JSON result:', resultado);
    alert('Datos en JSON:\n' + JSON.stringify(resultado, null, 2));
  }

  cancelar(){
    console.log('CANCELADOOO');
    this.formulario.reset(); 
  }

}
