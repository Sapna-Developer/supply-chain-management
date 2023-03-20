import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printgoodreturn2Component } from './printgoodreturn2.component';

describe('Printgoodreturn2Component', () => {
  let component: Printgoodreturn2Component;
  let fixture: ComponentFixture<Printgoodreturn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printgoodreturn2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printgoodreturn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
