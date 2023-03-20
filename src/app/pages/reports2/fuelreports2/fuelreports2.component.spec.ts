import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fuelreports2Component } from './fuelreports2.component';

describe('Fuelreports2Component', () => {
  let component: Fuelreports2Component;
  let fixture: ComponentFixture<Fuelreports2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fuelreports2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fuelreports2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
