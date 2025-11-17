export interface UserFormDTO {
    id: number | null, 
    nombre: string;
    telefono: string;
    passwordHash: string;
    idrol: number; 
}

export interface UserTableDTO {
    id: number;
    nombre: string;
    telefono: string;
    rol: string; 
}
