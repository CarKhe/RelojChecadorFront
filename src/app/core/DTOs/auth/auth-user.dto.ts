export interface UserAuthDTO {
  idUser: number;
  nombre: string;
  idRol: number;
  role: string
}

export interface AuthResponseDTO {
  token: string;
  user: UserAuthDTO;
}

