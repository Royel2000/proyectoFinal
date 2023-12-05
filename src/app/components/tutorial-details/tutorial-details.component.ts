import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Rol } from 'src/app/shared/services/roles';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  @Input() tutorial?: Rol;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Rol = {
    id:'',
    uid:'',
    rol:'',
    nombre: '',
    carrera: '',
    aprobado: '',
    imagen:'',
    apellido:'',
    grupo:''
  };
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status: string): void {
    if (this.currentTutorial.uid) {
      this.tutorialService.update(this.currentTutorial.uid, { aprobado: 'aprobo' })
      .then(() => {
        this.currentTutorial.aprobado = status;
        this.message = 'Estado de Aprobado, Actualizado Correctamente!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      nombre: this.currentTutorial.nombre,
      apellido: this.currentTutorial.apellido,
      grupo: this.currentTutorial.grupo
    };

    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
        .then(() => this.message = 'Alumno Modificado Correctamente!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Alumno eliminado correctamente!';
        })
        .catch(err => console.log(err));
    }
  }
}
