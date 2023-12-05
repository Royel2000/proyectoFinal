import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {
  usuarios_del_grupo: any;

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    // Aquí puedes llamar a la función del servicio que obtiene los datos del grupo
    // Algo así como (donde 'miClave' es un ejemplo, debes proporcionar la clave real)
this.rolesService.getDatosDelGrupo('miClave').subscribe(data => {
  // Haz algo con los datos
});

  }
}
