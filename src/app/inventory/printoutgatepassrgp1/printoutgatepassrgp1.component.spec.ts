import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printoutgatepassrgp1Component } from './printoutgatepassrgp1.component';

describe('Printoutgatepassrgp1Component', () => {
  let component: Printoutgatepassrgp1Component;
  let fixture: ComponentFixture<Printoutgatepassrgp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printoutgatepassrgp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printoutgatepassrgp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
