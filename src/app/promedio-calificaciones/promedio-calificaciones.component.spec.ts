import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromedioCalificacionesComponent } from './promedio-calificaciones.component';

describe('PromedioCalificacionesComponent', () => {
  let component: PromedioCalificacionesComponent;
  let fixture: ComponentFixture<PromedioCalificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromedioCalificacionesComponent]
    });
    fixture = TestBed.createComponent(PromedioCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
