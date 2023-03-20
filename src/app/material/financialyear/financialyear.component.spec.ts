import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialyearComponent } from './financialyear.component';

describe('FinancialyearComponent', () => {
  let component: FinancialyearComponent;
  let fixture: ComponentFixture<FinancialyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
