import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GenericCard } from "../../../../shared/components/generic-card/generic-card";
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { GenericInput } from "../../../../shared/components/generic-input/generic-input";
import { GenericButton } from '../../../../shared/components/generic-button/generic-button';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { LoginFormDTO } from '../../../../core/DTOs/auth/login-form.dto';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router) {
    this.formulario = this.fb.group({
      user: ['',[Validators.required]],
      pass: ['',[Validators.required]]
    });
  }

  login(){
    const dto: LoginFormDTO = {
      username: this.formulario.value.user,
      password: this.formulario.value.pass
    };
      const ok = this.authService.login(dto);

    if (!ok) {
      // Mostrar error
      console.log("Credenciales incorrectas");
      return;
    }

    // Redirigir según el rol
    const role = this.authService.getRole();
    this.router.navigate([`/${role}`]);
  }
}
