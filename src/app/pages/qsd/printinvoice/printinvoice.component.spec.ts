import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintinvoiceComponent } from './printinvoice.component';

describe('PrintinvoiceComponent', () => {
  let component: PrintinvoiceComponent;
  let fixture: ComponentFixture<PrintinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
