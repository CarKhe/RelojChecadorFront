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
      telefono: ['',[Validators.required]],
      passwordHash: ['',[Validators.required]]
    });
  }

  login(){
    if (this.formulario.invalid) return;
    const dto: LoginFormDTO = {
      telefono: this.formulario.value.telefono,
      passwordHash: this.formulario.value.passwordHash
    };
    this.authService.login(dto).subscribe({
      next: (data) =>{
        if(!data){
          console.log("Credenciales incorrectas");
          this.formulario.reset(); 
          return;
        }
        const role = this.authService.getRole();
        this.router.navigate([`/${role}`]);
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
