import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelissuerequestComponent } from './fuelissuerequest.component';

describe('FuelissuerequestComponent', () => {
  let component: FuelissuerequestComponent;
  let fixture: ComponentFixture<FuelissuerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelissuerequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelissuerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
