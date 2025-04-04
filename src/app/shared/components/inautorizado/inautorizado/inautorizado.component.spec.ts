import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InautorizadoComponent } from './inautorizado.component';

describe('InautorizadoComponent', () => {
  let component: InautorizadoComponent;
  let fixture: ComponentFixture<InautorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InautorizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InautorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
