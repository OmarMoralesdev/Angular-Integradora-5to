import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenvioComponent } from './reenvio.component';

describe('ReenvioComponent', () => {
  let component: ReenvioComponent;
  let fixture: ComponentFixture<ReenvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReenvioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReenvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
