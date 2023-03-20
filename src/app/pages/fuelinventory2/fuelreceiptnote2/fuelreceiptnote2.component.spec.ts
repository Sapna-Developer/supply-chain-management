import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fuelreceiptnote2Component } from './fuelreceiptnote2.component';

describe('Fuelreceiptnote2Component', () => {
  let component: Fuelreceiptnote2Component;
  let fixture: ComponentFixture<Fuelreceiptnote2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fuelreceiptnote2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fuelreceiptnote2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
