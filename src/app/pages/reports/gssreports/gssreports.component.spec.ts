import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GssreportsComponent } from './gssreports.component';

describe('GssreportsComponent', () => {
  let component: GssreportsComponent;
  let fixture: ComponentFixture<GssreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GssreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GssreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
