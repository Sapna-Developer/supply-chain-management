import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printgoodsreceipt2Component } from './printgoodsreceipt2.component';

describe('Printgoodsreceipt2Component', () => {
  let component: Printgoodsreceipt2Component;
  let fixture: ComponentFixture<Printgoodsreceipt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printgoodsreceipt2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printgoodsreceipt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
