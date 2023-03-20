import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutwardNrgp1Component } from './gate-outward-nrgp1.component';

describe('GateOutwardNrgp1Component', () => {
  let component: GateOutwardNrgp1Component;
  let fixture: ComponentFixture<GateOutwardNrgp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateOutwardNrgp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateOutwardNrgp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
