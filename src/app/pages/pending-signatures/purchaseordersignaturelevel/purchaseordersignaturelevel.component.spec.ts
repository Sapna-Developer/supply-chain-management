import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordersignaturelevelComponent } from './purchaseordersignaturelevel.component';

describe('PurchaseordersignaturelevelComponent', () => {
  let component: PurchaseordersignaturelevelComponent;
  let fixture: ComponentFixture<PurchaseordersignaturelevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseordersignaturelevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordersignaturelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
