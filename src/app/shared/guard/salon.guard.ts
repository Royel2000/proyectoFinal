import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanActivate {
  rolesUsuario: any;
  datos: any = localStorage.getItem('roldata');
  constructor(private router: Router) {
    this.rolesUsuario = JSON.parse(this.datos);
  }

  canActivate(): boolean {
    console.log("Usuario tiene el rol:", this.rolesUsuario.rol);
    return true;
  }
}
