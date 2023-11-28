import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  // Nueva propiedad para manejar la imagen seleccionada
  imagenSeleccionada: File | null = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  // Método para manejar la selección de la imagen
  onImagenSeleccionada(event: any): void {
    const archivo: File = event.target.files[0];

    if (archivo) {
      this.imagenSeleccionada = archivo;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    // Asegúrate de que la propiedad imagen no sea undefined antes de asignarla
    if (this.imagenSeleccionada) {
      this.usuario.imagen = this.imagenSeleccionada;
    }

    // Asegúrate de pasar la imagen seleccionada al método nuevoUsuario
    this.auth.nuevoUsuario(this.usuario, this.imagenSeleccionada)
      .subscribe(resp => {
        console.log(resp);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }
}
