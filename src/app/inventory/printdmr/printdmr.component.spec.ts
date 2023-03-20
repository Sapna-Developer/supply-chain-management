import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintdmrComponent } from './printdmr.component';

describe('PrintdmrComponent', () => {
  let component: PrintdmrComponent;
  let fixture: ComponentFixture<PrintdmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintdmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintdmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
