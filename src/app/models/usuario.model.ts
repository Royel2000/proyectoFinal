export class UsuarioModel {
  email: string = '';
  password: string = '';
  nombre: string = '';
  grupo: string = '';
  carrera: string = '';
  rol: string = '';
  imagen: File | undefined;


  constructor() {
    this.email = '';
    this.password = '';
    this.nombre = '';
    this.grupo = '';
    this.carrera = '';
    this.rol = '';
    this.imagen = undefined;
  }
}
