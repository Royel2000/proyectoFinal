import { Component, Inject } from '@angular/core';
import { AlumnoService } from '../admin/alumno.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  alumnos: any[] = [];

  constructor(@Inject(AlumnoService) private alumnoService: AlumnoService) {
    this.alumnos = this.alumnoService.getAlumnos();
  }
}
