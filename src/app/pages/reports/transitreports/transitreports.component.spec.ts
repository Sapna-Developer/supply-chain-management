import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitreportsComponent } from './transitreports.component';

describe('TransitreportsComponent', () => {
  let component: TransitreportsComponent;
  let fixture: ComponentFixture<TransitreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
