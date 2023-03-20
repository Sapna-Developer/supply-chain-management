import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintworkreqComponent } from './printworkreq.component';

describe('PrintworkreqComponent', () => {
  let component: PrintworkreqComponent;
  let fixture: ComponentFixture<PrintworkreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintworkreqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintworkreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
