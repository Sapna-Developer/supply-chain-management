import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutwardGI2Component } from './gate-outward-gi2.component';

describe('GateOutwardGI2Component', () => {
  let component: GateOutwardGI2Component;
  let fixture: ComponentFixture<GateOutwardGI2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateOutwardGI2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateOutwardGI2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
