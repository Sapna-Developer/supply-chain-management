import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateInward2Component } from './gate-inward2.component';

describe('GateInward2Component', () => {
  let component: GateInward2Component;
  let fixture: ComponentFixture<GateInward2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateInward2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateInward2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
