import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaserequest2Component } from './purchaserequest2.component';

describe('Purchaserequest2Component', () => {
  let component: Purchaserequest2Component;
  let fixture: ComponentFixture<Purchaserequest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Purchaserequest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Purchaserequest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
