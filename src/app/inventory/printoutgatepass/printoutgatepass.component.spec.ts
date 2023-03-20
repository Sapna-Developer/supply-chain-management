import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintoutgatepassComponent } from './printoutgatepass.component';

describe('PrintoutgatepassComponent', () => {
  let component: PrintoutgatepassComponent;
  let fixture: ComponentFixture<PrintoutgatepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintoutgatepassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintoutgatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
