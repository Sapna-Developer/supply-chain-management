import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gssreports2Component } from './gssreports2.component';

describe('Gssreports2Component', () => {
  let component: Gssreports2Component;
  let fixture: ComponentFixture<Gssreports2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gssreports2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gssreports2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
