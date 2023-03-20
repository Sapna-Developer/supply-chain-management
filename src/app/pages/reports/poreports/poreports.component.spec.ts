import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoreportsComponent } from './poreports.component';

describe('PoreportsComponent', () => {
  let component: PoreportsComponent;
  let fixture: ComponentFixture<PoreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
