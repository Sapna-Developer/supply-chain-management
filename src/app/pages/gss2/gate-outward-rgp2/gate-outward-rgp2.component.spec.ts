import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutwardRGP2Component } from './gate-outward-rgp2.component';

describe('GateOutwardRGP2Component', () => {
  let component: GateOutwardRGP2Component;
  let fixture: ComponentFixture<GateOutwardRGP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateOutwardRGP2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateOutwardRGP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
