import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
    }
  }
  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/principal');
  }

  login() {
    if(this.auth.estaAutenticado()){
      return true;
    }
    else {
      return false;
    }
  }

}
