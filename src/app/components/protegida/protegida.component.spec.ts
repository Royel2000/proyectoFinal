import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtegidaComponent } from './protegida.component';

describe('ProtegidaComponent', () => {
  let component: ProtegidaComponent;
  let fixture: ComponentFixture<ProtegidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtegidaComponent]
    });
    fixture = TestBed.createComponent(ProtegidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
