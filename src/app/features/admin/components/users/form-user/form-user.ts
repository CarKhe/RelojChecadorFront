import { Component, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericInput } from "../../../../../shared/components/generic-input/generic-input";
import { GenericSelect } from "../../../../../shared/components/generic-select/generic-select";
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminUserService } from '../../../../../core/services/admin/admin-user-service';
import { RolesDTO } from '../../../../../core/DTOs/admin/roles.dto';
import { UserFormDTO, UserTableDTO } from '../../../../../core/DTOs/admin/user-form.dto';


@Component({
  selector: 'app-form-user',
  imports: [GenericCard, GenericInput,
    GenericSelect, GenericButton,
    MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.scss',
})
export class FormUser implements OnInit, OnChanges {
  @Input() usuarioModificar?:UserTableDTO; 

  formulario: FormGroup;
  roles: RolesDTO[] = [];
  crearUsuario: boolean = true;

  constructor(private fb: FormBuilder,private userService: AdminUserService) {
    this.formulario = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      contraseña: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(data => this.roles = data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['usuarioModificar'] && this.usuarioModificar){
      this.setModificar(this.usuarioModificar);
    }
  }

  guardar() {
    const areaForm: UserFormDTO = this.formulario.value;
    this.userService.guardarUsuario(areaForm);
    this.formulario.reset(); 
    
  }

  setModificar(usuario: UserTableDTO){
    const userFormMod: UserFormDTO = this.userService.setToModificar(usuario);
    this.formulario.patchValue({
      id: userFormMod.id,
      nombre: userFormMod.nombre,
      telefono: userFormMod.telefono,
      contraseña: userFormMod.contraseña,
      rol: userFormMod.rol
    });
    this.formulario.markAsPristine();
    this.crearUsuario = false;
  }

  modificar(){
    if(this.formulario.value.id){
      console.log(this.formulario.value);
    }
    this.formulario.reset(); 
  }

  cancelar(){
    this.formulario.reset(); 
    this.formulario.markAsPristine();
    this.crearUsuario = true;
  }

}
