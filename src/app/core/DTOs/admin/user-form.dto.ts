export interface UserFormDTO {
    id: number | null, 
    nombre: string;
    telefono: string;
    contraseña: string;
    rol: number; 
}

export interface UserTableDTO {
    id: number;
    nombre: string;
    telefono: string;
    rol: string; 
}
