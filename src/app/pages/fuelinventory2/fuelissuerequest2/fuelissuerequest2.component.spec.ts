import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fuelissuerequest2Component } from './fuelissuerequest2.component';

describe('Fuelissuerequest2Component', () => {
  let component: Fuelissuerequest2Component;
  let fixture: ComponentFixture<Fuelissuerequest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fuelissuerequest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fuelissuerequest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
