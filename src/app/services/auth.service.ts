import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyDNxBpaczqt-ZtvR_YW0Hf3crTwW7KCcMA ';
  userToken: string | null = null;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    this.userToken = null;
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post<AuthResponse>(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp: AuthResponse) => {
        this.guardarToken(resp.idToken);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post<AuthResponse>(
      `${this.url}/signupNewUser?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp: AuthResponse) => {
        this.guardarToken(resp.idToken);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userToken = token;
    } else {
      this.userToken = null;
    }
  }

  estaAutenticado(): boolean {
    return this.userToken !== null && this.userToken.length > 2;
  }
}


interface AuthResponse {
  idToken: string;

}
