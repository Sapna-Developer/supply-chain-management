import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Goodsissue2Component } from './goodsissue2.component';

describe('Goodsissue2Component', () => {
  let component: Goodsissue2Component;
  let fixture: ComponentFixture<Goodsissue2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Goodsissue2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Goodsissue2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
