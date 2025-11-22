export interface AreaFormDTO {
    nombre: string;
    descripcion: string;
    centroLat: number;
    centroLon: number;
    radio: number;
}

export interface AreaTableDTO{
    id: number;
    nombre: string;
    descripcion: string;
    centroLat: number;
    centroLon: number;
    radio: number;
    fechaCreacion: Date; 
}
