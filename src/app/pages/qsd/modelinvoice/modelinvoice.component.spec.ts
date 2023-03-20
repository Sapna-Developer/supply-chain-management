import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelinvoiceComponent } from './modelinvoice.component';

describe('ModelinvoiceComponent', () => {
  let component: ModelinvoiceComponent;
  let fixture: ComponentFixture<ModelinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
