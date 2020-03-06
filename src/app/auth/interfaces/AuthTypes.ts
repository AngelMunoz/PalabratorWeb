import { Usuario } from 'src/app/types/usuario';

export interface SignupPayload {
  nombre: string;
  apellidos: string;
  correo: string;
  usuario: string;
  contrasena: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
  usuario?: Usuario
}
