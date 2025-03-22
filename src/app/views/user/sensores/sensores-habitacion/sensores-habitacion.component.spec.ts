import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresHabitacionComponent } from './sensores-habitacion.component';

describe('SensoresHabitacionComponent', () => {
  let component: SensoresHabitacionComponent;
  let fixture: ComponentFixture<SensoresHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensoresHabitacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensoresHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
