import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateoutwardComponent } from './gateoutward.component';

describe('GateoutwardComponent', () => {
  let component: GateoutwardComponent;
  let fixture: ComponentFixture<GateoutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateoutwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateoutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
