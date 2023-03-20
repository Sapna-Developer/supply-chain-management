import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutwardRgpComponent } from './gate-outward-rgp.component';

describe('GateOutwardRgpComponent', () => {
  let component: GateOutwardRgpComponent;
  let fixture: ComponentFixture<GateOutwardRgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateOutwardRgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateOutwardRgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
