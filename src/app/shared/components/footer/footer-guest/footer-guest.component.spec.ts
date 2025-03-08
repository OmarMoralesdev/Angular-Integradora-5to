import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGuestComponent } from './footer-guest.component';

describe('FooterGuestComponent', () => {
  let component: FooterGuestComponent;
  let fixture: ComponentFixture<FooterGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
