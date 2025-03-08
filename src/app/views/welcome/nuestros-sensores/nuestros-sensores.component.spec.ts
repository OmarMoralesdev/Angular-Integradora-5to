import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosSensoresComponent } from './nuestros-sensores.component';

describe('NuestrosSensoresComponent', () => {
  let component: NuestrosSensoresComponent;
  let fixture: ComponentFixture<NuestrosSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrosSensoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestrosSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
