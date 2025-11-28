export interface UserAuthDTO {
  idUser: number;
  username: string;
  idRol: number;
  role: string
}

export interface AuthResponseDTO {
  token: string;
  user: UserAuthDTO;
}

