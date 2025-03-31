import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaHabitacionComponent } from './alta-habitacion.component';

describe('AltaHabitacionComponent', () => {
  let component: AltaHabitacionComponent;
  let fixture: ComponentFixture<AltaHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaHabitacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
