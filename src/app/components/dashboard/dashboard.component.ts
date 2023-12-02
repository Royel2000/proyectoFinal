import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Rol } from 'src/app/shared/services/roles';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rolesUsuario:any;
  datos:any =localStorage.getItem('roldata');

  constructor(public authService: AuthService) {
    
    this.rolesUsuario = JSON.parse(this.datos);

    console.log('roldata', this.rolesUsuario);
  }
  
  ngOnInit(): void {}
}
