import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Goodsreceipt2Component } from './goodsreceipt2.component';

describe('Goodsreceipt2Component', () => {
  let component: Goodsreceipt2Component;
  let fixture: ComponentFixture<Goodsreceipt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Goodsreceipt2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Goodsreceipt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
