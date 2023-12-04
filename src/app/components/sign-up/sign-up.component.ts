import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UploadFormComponent } from '../upload-form/upload-form.component';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(public authService: AuthService,private uploadService: FileUploadService) {}
  ngOnInit() {}

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

    this.promedio =
      (this.calificacion1! + this.calificacion2! + this.calificacion3!) / 3;
    this.submitted = true;
  }

  aprobo(promedio:any){
    if(promedio! >= 50){
      return "aprobo";
    }
    else{
      return "reprobo";
    }
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload();
        this.currentFileUpload.file=file;
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
