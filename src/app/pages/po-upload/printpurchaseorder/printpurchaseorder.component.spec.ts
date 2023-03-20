import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintpurchaseorderComponent } from './printpurchaseorder.component';

describe('PrintpurchaseorderComponent', () => {
  let component: PrintpurchaseorderComponent;
  let fixture: ComponentFixture<PrintpurchaseorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintpurchaseorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintpurchaseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
