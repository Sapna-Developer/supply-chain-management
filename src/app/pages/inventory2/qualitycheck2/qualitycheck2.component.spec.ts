import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qualitycheck2Component } from './qualitycheck2.component';

describe('Qualitycheck2Component', () => {
  let component: Qualitycheck2Component;
  let fixture: ComponentFixture<Qualitycheck2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Qualitycheck2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Qualitycheck2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
