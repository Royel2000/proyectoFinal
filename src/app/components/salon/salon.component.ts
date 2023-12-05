import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { map } from 'rxjs/operators';
import { Rol } from 'src/app/shared/services/roles';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css'],
})
export class SalonComponent implements OnInit {
  usuarios_del_grupo: any;
  roldata: any;
  data: any;
  constructor(
    public rolesuser: RolesService,
    public tutorialService: TutorialService,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    //this.retrieveTutorials();
    this.roldata = localStorage.getItem('roldata');
    this.data = JSON.parse(this.roldata);
    //console.log(this.data.grupo);
    //this.Rolesquery(this.data.grupo);
    //console.log(this.rolesuser.getRol2('h'));
    this.rolesuser.getRol2(this.data.grupo).subscribe((data: any) => {
    this.usuarios_del_grupo = data;
    });
  }
  Rolesquery(key: string) {
    this.rolesuser
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        var datos: any = [];
        var busqueda: any;
        data.forEach(function (value) {
          if (value.grupo == key) {
            datos[key] = value;
          }
        });
        this.usuarios_del_grupo = busqueda;
        console.log(this.usuarios_del_grupo);
      });
  }
  buscar(fac:string, busqueda:string){
    this.rolesuser.Busqueda(fac,busqueda).subscribe((data: any) => {
      this.usuarios_del_grupo = data;
    });
  }
}
