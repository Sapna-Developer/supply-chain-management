import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintpurchasereqComponent } from './printpurchasereq.component';

describe('PrintpurchasereqComponent', () => {
  let component: PrintpurchasereqComponent;
  let fixture: ComponentFixture<PrintpurchasereqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintpurchasereqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintpurchasereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
