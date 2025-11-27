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
import { SnackbarService } from '../../../../../shared/services/snackbar';
import { LoaderService } from '../../../../../shared/services/loader-service';
import { ChipItem } from '../../../../../shared/DTOs/chip-item.dto';
import { GenericChipSelect } from "../../../../../shared/components/generic-chip-select/generic-chip-select";
import { AdminAreaService } from '../../../../../core/services/admin/admin-area-service';


@Component({
  selector: 'app-form-user',
  imports: [GenericCard, GenericInput,
    GenericSelect, GenericButton,
    MatFormFieldModule, ReactiveFormsModule, GenericChipSelect],
  templateUrl: './form-user.html',
  styleUrl: './form-user.scss',
})
export class FormUser implements OnInit, OnChanges {
  @Input() usuarioModificar?:UserTableDTO; 
  @Output() recargarTabla = new EventEmitter<void>();

  formulario: FormGroup;
  roles: RolesDTO[] = [];
  areasCat: ChipItem[] = [];
  crearUsuario: boolean = true;
  seleccionados: number[] = []; 

  constructor(private fb: FormBuilder, private userService: AdminUserService,
              private rolService: AdminRolesService,
              private areaService: AdminAreaService,
              private snackBar: SnackbarService, 
              private loader: LoaderService){
    this.formulario = this.fb.group({
      id: [ 0 ],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      passwordHash: ['', Validators.required],
      idRol: [ 0 ],
      idAreas: [[]]
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.getAreas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['usuarioModificar'] && this.usuarioModificar){
      this.setModificar(this.usuarioModificar);
    }
  }

  getRoles(){
    this.loader.show();
    this.rolService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.loader.hide();
      },
      error: (err) => {
        this.loader.hide();
        this.snackBar.error(err.message);
      }
    });
  }

  getAreas(){
    this.loader.show();
    this.areaService.getAreaChip().subscribe({
      next: (data) => {
        this.areasCat = data;
        this.loader.hide();
      },
      error: (err) => {
        this.loader.hide();
        this.snackBar.error(err.message);
      }
    });
  }

  guardar() {
    const areaForm: UserFormDTO = this.formulario.value;
    console.log(areaForm);
    this.userService.postUsuario(areaForm).subscribe({
      next: (resp) =>{
        console.log('Usuario creado:', resp);
        this.formulario.reset(); 
        this.recargarTabla.emit();
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
      }
    });
  }

  modificar(){
    if(this.formulario.value.id){
      const areaForm: UserFormDTO = this.formulario.value;
      this.userService.putUsuario(areaForm).subscribe({
        next: (resp) => {
          console.log('Usuario Modificado', resp);
          this.formulario.reset(); 
          this.recargarTabla.emit();
        },
        error: (err) => {
          console.error('Error al Modificar usuario', err);
        }
      });
    }
    this.formulario.reset(); 
  }

  setModificar(usuario: UserTableDTO){
    this.userService.setToModificar(usuario.id).subscribe({
      next: (data) => {
        this.formulario.patchValue({
          id: data.id,
          nombre: data.nombre,
          telefono: data.telefono,
          passwordHash: data.passwordHash,
          idRol: data.idRol
        });
        this.formulario.markAsPristine();
        this.crearUsuario = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });

  }

  cancelar(){
    this.formulario.reset(); 
    this.formulario.markAsPristine();
    this.crearUsuario = true;
  }

}
