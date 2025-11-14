export interface AuthUserDTO {
    username: string;
    role: 'admin' | 'user';     
    token?: string;     
}
