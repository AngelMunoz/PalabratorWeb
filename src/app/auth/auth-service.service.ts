import { Injectable } from '@angular/core';
import { AuthModule } from './auth.module';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, SignupPayload, AuthResponse } from './interfaces/AuthTypes';
import { environment } from 'src/environments/environment';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {

  authUrl = `${environment.baseUrl}/auth`;

  constructor(private $http: HttpClient) { }

  async login(payload: LoginPayload) {
    try {
      const result = await this.$http.post<AuthResponse>(`${this.authUrl}/login`, payload).toPromise();
      localStorage.setItem('access_token', result.accessToken);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(payload: SignupPayload) {
    try {
      const result = await this.$http.post<AuthResponse>(`${this.authUrl}/signup`, payload).toPromise();
      localStorage.setItem('access_token', result.accessToken);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    window.location.replace('/');
  }

  getAuthorizationToken() {
    const token = localStorage.getItem('access_token');
    try {
      this.isAlive(jwtDecode(token))
    } catch (error) {
      return undefined;
    }
    return token;
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    try {
      this.isAlive(jwtDecode(token))
    } catch (error) {
      return false;
    }
    return true;
  }

  private isAlive(decoded) {
    const now = Date.now().valueOf() / 1000
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      throw new Error(`token expired: ${JSON.stringify(decoded)}`);
    }
    if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
      throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`);
    }
  }

}
