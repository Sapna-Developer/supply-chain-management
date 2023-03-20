import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fuelissue2Component } from './fuelissue2.component';

describe('Fuelissue2Component', () => {
  let component: Fuelissue2Component;
  let fixture: ComponentFixture<Fuelissue2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fuelissue2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fuelissue2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
