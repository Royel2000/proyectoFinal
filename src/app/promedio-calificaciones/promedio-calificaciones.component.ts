import { Component } from '@angular/core';

@Component({
  selector: 'app-promedio-calificaciones',
  templateUrl: './promedio-calificaciones.component.html',
  styleUrls: ['./promedio-calificaciones.component.css']
})
export class PromedioCalificacionesComponent {
  calificacion1: number | null = null;
  calificacion2: number | null = null;
  calificacion3: number | null = null;
  promedio: number | null = null;
  submitted: boolean = false;

  calcularPromedio() {
    if (!this.sonCalificacionesValidas()) {
      alert('Ingresa calificaciones válidas entre 0 y 100.');
      return;
    }

    this.promedio = (this.calificacion1! + this.calificacion2! + this.calificacion3!) / 3;
    this.submitted = true;
  }

  sonCalificacionesValidas(): boolean {
    return (
      this.calificacion1 !== null &&
      this.calificacion2 !== null &&
      this.calificacion3 !== null &&
      this.esNumeroValido(this.calificacion1!) &&
      this.esNumeroValido(this.calificacion2!) &&
      this.esNumeroValido(this.calificacion3!)
    );
  }

  esNumeroValido(numero: number | null): boolean {
    return numero !== null && !isNaN(numero) && numero >= 0 && numero <= 100;
  }

  nuevasCalificaciones() {
    this.calificacion1 = null;
    this.calificacion2 = null;
    this.calificacion3 = null;
    this.promedio = null;
    this.submitted = false;
  }
}
