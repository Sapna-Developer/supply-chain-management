import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBunkReqComponent } from './print-bunk-req.component';

describe('PrintBunkReqComponent', () => {
  let component: PrintBunkReqComponent;
  let fixture: ComponentFixture<PrintBunkReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBunkReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBunkReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
