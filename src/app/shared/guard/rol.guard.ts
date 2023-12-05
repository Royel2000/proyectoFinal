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
    
    if (this.rolesUsuario.rol === "admin") {
      console.log("es admin");
      return true;
    } else {
      this.router.navigateByUrl('/add');
      return false;
    }
  }
}
