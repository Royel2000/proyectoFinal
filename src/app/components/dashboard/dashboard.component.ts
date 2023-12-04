import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  roles_del_usuario:any;
  usuario:any;
  data:any;
  constructor(public rolesuser: RolesService,public authService: AuthService) {
    
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
}