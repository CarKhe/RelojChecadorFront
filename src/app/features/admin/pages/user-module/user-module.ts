import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormUser } from "../../components/users/form-user/form-user";
import { TableUser } from "../../components/users/table-user/table-user";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserTableDTO } from '../../../../core/DTOs/admin/user-form.dto';
import { GenericLoader } from "../../../../shared/components/generic-loader/generic-loader";
import { LoaderService } from '../../../../shared/services/loader-service';

@Component({
  selector: 'app-user-module',
  imports: [FormUser, TableUser, GenericLoader],
  templateUrl: './user-module.html',
  styleUrl: './user-module.scss',
})
export class UserModule implements OnInit {
  usuarioMod?: UserTableDTO; 
  private breakpointObserver = inject(BreakpointObserver);
  cargando = false;

  @ViewChild('tabla') tabla!: TableUser;




  constructor(private loader: LoaderService) {
    this.loader.loading$.subscribe(valor => {
      this.cargando = valor;
    });
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isHandset.set(result.matches);
      });
  }

  // señal reactiva para el modo móvil
  isHandset = signal(false);

  ngOnInit() {
    this.cargando = true;

    setTimeout(() => {
      this.cargando = false;
    }, 2000);
  }

  ToModificar(usuario: UserTableDTO){
    this.usuarioMod = { ...usuario };
  }

  recargarTablaForm(){
    this.tabla.cargarUsuarios();
  }



}
