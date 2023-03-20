import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyDetailsComponent } from './qty-details.component';

describe('QtyDetailsComponent', () => {
  let component: QtyDetailsComponent;
  let fixture: ComponentFixture<QtyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
