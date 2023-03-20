import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutwardNRGP2Component } from './gate-outward-nrgp2.component';

describe('GateOutwardNRGP2Component', () => {
  let component: GateOutwardNRGP2Component;
  let fixture: ComponentFixture<GateOutwardNRGP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateOutwardNRGP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateOutwardNRGP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
