import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printgoodsissue2Component } from './printgoodsissue2.component';

describe('Printgoodsissue2Component', () => {
  let component: Printgoodsissue2Component;
  let fixture: ComponentFixture<Printgoodsissue2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printgoodsissue2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printgoodsissue2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
