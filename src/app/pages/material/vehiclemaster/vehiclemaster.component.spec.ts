import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemasterComponent } from './vehiclemaster.component';

describe('VehiclemasterComponent', () => {
  let component: VehiclemasterComponent;
  let fixture: ComponentFixture<VehiclemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
