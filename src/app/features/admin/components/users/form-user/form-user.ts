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
import { AdminRolesService } from '../../../../../core/services/admin/admin-roles-service';


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

  constructor(private fb: FormBuilder, private userService: AdminUserService,
              private rolService: AdminRolesService) {
    this.formulario = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      passwordHash: ['', Validators.required],
      idRol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.rolService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['usuarioModificar'] && this.usuarioModificar){
      this.setModificar(this.usuarioModificar);
    }
  }

  guardar() {
    const areaForm: UserFormDTO = this.formulario.value;
    console.log(areaForm);
    this.userService.postUsuario(areaForm).subscribe({
      next: (resp) =>{
        console.log('Usuario creado:', resp);
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
      }
    });
    this.formulario.reset(); 
    
  }

  setModificar(usuario: UserTableDTO){
    const userFormMod: UserFormDTO = this.userService.setToModificar(usuario);
    this.formulario.patchValue({
      id: userFormMod.id,
      nombre: userFormMod.nombre,
      telefono: userFormMod.telefono,
      contraseña: userFormMod.passwordHash,
      rol: userFormMod.idrol
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
