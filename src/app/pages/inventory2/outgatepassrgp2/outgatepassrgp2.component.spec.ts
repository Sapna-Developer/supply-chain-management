import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Outgatepassrgp2Component } from './outgatepassrgp2.component';

describe('Outgatepassrgp2Component', () => {
  let component: Outgatepassrgp2Component;
  let fixture: ComponentFixture<Outgatepassrgp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Outgatepassrgp2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Outgatepassrgp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
