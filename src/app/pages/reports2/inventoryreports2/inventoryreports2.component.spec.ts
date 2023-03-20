import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inventoryreports2Component } from './inventoryreports2.component';

describe('Inventoryreports2Component', () => {
  let component: Inventoryreports2Component;
  let fixture: ComponentFixture<Inventoryreports2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Inventoryreports2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Inventoryreports2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
