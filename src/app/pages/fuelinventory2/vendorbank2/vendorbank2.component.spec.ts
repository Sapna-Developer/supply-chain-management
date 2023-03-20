import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendorbank2Component } from './vendorbank2.component';

describe('Vendorbank2Component', () => {
  let component: Vendorbank2Component;
  let fixture: ComponentFixture<Vendorbank2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Vendorbank2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Vendorbank2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
