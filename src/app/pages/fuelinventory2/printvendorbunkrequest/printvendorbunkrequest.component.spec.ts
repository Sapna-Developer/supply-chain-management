import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintvendorbunkrequestComponent } from './printvendorbunkrequest.component';

describe('PrintvendorbunkrequestComponent', () => {
  let component: PrintvendorbunkrequestComponent;
  let fixture: ComponentFixture<PrintvendorbunkrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintvendorbunkrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintvendorbunkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
