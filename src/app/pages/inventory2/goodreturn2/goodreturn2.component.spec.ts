import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Goodreturn2Component } from './goodreturn2.component';

describe('Goodreturn2Component', () => {
  let component: Goodreturn2Component;
  let fixture: ComponentFixture<Goodreturn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Goodreturn2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Goodreturn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
