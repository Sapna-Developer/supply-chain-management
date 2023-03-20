import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printpurchaserequest2Component } from './printpurchaserequest2.component';

describe('Printpurchaserequest2Component', () => {
  let component: Printpurchaserequest2Component;
  let fixture: ComponentFixture<Printpurchaserequest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printpurchaserequest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printpurchaserequest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
