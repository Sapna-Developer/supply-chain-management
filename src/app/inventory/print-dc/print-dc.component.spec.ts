import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDcComponent } from './print-dc.component';

describe('PrintDcComponent', () => {
  let component: PrintDcComponent;
  let fixture: ComponentFixture<PrintDcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
