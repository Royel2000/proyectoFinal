// alumno.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private alumnos: any[] = [];

  getAlumnos() {
    return this.alumnos;
  }

  addAlumno(alumno: any) {
    this.alumnos.push(alumno);
  }
}
