import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaroucelComponent } from './caroucel.component';

describe('CaroucelComponent', () => {
  let component: CaroucelComponent;
  let fixture: ComponentFixture<CaroucelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaroucelComponent]
    });
    fixture = TestBed.createComponent(CaroucelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
