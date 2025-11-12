export interface RegistroAsistenciaDTO {
  tipo: 'ENTRADA' | 'SALIDA';
  fecha: Date;
  latitud: number;
  longitud: number;
}
