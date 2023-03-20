import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrreportsComponent } from './prreports.component';

describe('PrreportsComponent', () => {
  let component: PrreportsComponent;
  let fixture: ComponentFixture<PrreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
