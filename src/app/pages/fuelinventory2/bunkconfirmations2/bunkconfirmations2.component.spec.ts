import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bunkconfirmations2Component } from './bunkconfirmations2.component';

describe('Bunkconfirmations2Component', () => {
  let component: Bunkconfirmations2Component;
  let fixture: ComponentFixture<Bunkconfirmations2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bunkconfirmations2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bunkconfirmations2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
