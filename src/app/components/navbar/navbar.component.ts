import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  roles_del_usuario:any;
  usuario:any;
  data:any;
  datos: any = localStorage.getItem('roldata');
  constructor(private auth: AuthService, private router: Router,public rolesuser: RolesService) {
  }
  ngOnInit(): void {
    this.usuario=localStorage.getItem('user');
    this.data=JSON.parse(this.usuario);
    this.Rolesquery(this.data.uid);
    //console.log(this.authService.userData);
    }
    Rolesquery(key: string) {
      this.rolesuser.getAll().snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({
              key: c.payload.doc.id,
              ...c.payload.doc.data(),
            }))
          )
        )
        .subscribe((data) => {
          var busqueda: any;
          data.forEach(function (value) {
            if (value.uid == key) {
              busqueda = value;
            }
          });
          this.roles_del_usuario=busqueda;
  
        });
    }
  salir() {
    this.auth.SignOut();
    this.router.navigateByUrl('/log-in');
  }
}
