export interface RegistroAsistenciaDTO {
  idUsuario: number;
  idMovimiento: number;
  idArea: number;
  latitud: number;
  longitud: number;
  dentroZona: number;
}

export interface LastRegisterDTO {
  idUsuario: number;
}

export interface LastRegisterReturnDTO{
  movimiento: number;
  date: Date;
}