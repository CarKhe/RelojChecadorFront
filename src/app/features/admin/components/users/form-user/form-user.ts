import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericInput } from "../../../../../shared/components/generic-input/generic-input";
import { GenericSelect } from "../../../../../shared/components/generic-select/generic-select";
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminUserService } from '../../../../../core/services/admin/admin-user-service';
import { RolesDTO } from '../../../../../core/DTOs/admin/roles.dto';
import { UserFormDTO } from '../../../../../core/DTOs/admin/user-form.dto';

@Component({
  selector: 'app-form-user',
  imports: [GenericCard, GenericInput, 
    GenericSelect, GenericButton,
    MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.scss',
})
export class FormUser implements OnInit {
  formulario: FormGroup;
  roles: RolesDTO[] = [];



  constructor(private fb: FormBuilder,private userService: AdminUserService) {
    this.formulario = this.fb.group({
      nombre: [''],
      telefono: [''],
      contraseña: [''],
      rol: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(data => this.roles = data);
  }
  guardar() {
    const areaForm: UserFormDTO = this.formulario.value;
    this.userService.guardarUsuario(areaForm);
  }

  cancelar(){
    this.formulario.reset(); 
  }

}
