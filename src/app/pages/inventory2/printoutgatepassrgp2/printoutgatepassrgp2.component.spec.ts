import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printoutgatepassrgp2Component } from './printoutgatepassrgp2.component';

describe('Printoutgatepassrgp2Component', () => {
  let component: Printoutgatepassrgp2Component;
  let fixture: ComponentFixture<Printoutgatepassrgp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printoutgatepassrgp2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printoutgatepassrgp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
