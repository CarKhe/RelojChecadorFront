import { Component, inject, OnInit, signal } from '@angular/core';
import { FormUser } from "../../components/users/form-user/form-user";
import { TableUser } from "../../components/users/table-user/table-user";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserTableDTO } from '../../../../core/DTOs/admin/user-form.dto';

@Component({
  selector: 'app-user-module',
  imports: [ FormUser, TableUser],
  templateUrl: './user-module.html',
  styleUrl: './user-module.scss',
})
export class UserModule implements OnInit {
  usuarioMod?: UserTableDTO; 
  private breakpointObserver = inject(BreakpointObserver);
  cargando = false;

  // señal reactiva para el modo móvil
  isHandset = signal(false);

  ngOnInit() {
    this.cargando = true;

    setTimeout(() => {
      this.cargando = false;
    }, 2000);
  }

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isHandset.set(result.matches);
      });
  }

  ToModificar(usuario: UserTableDTO){
    this.usuarioMod = { ...usuario };
  }

}
