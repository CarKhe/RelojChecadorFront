import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GenericCard } from "../../../../shared/components/generic-card/generic-card";
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { GenericInput } from "../../../../shared/components/generic-input/generic-input";
import { GenericButton } from '../../../../shared/components/generic-button/generic-button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatCardModule,
    ReactiveFormsModule, GenericCard,
    GenericInput, GenericButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  titulo: string = environment.appTitle + " login";
  formulario: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      user: ['',[Validators.required]],
      pass: ['',[Validators.required]]
    });
  }

  login(){
     console.log('Datos del login:',this.formulario.value);
  }
}
