import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printoutgatepassrgpnrgp1Component } from './printoutgatepassrgpnrgp1.component';

describe('Printoutgatepassrgpnrgp1Component', () => {
  let component: Printoutgatepassrgpnrgp1Component;
  let fixture: ComponentFixture<Printoutgatepassrgpnrgp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printoutgatepassrgpnrgp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printoutgatepassrgpnrgp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
