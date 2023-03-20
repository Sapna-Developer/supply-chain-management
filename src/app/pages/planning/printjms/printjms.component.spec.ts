import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintjmsComponent } from './printjms.component';

describe('PrintjmsComponent', () => {
  let component: PrintjmsComponent;
  let fixture: ComponentFixture<PrintjmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintjmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintjmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
