import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Outgatepassrgp1Component } from './outgatepassrgp1.component';

describe('Outgatepassrgp1Component', () => {
  let component: Outgatepassrgp1Component;
  let fixture: ComponentFixture<Outgatepassrgp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Outgatepassrgp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Outgatepassrgp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
