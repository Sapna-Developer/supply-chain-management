import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateOutwardGIComponent } from './gate-outward-gi.component';

describe('GateOutwardGIComponent', () => {
  let component: GateOutwardGIComponent;
  let fixture: ComponentFixture<GateOutwardGIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateOutwardGIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateOutwardGIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
