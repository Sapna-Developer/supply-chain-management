import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Goodsissuerequest2Component } from './goodsissuerequest2.component';

describe('Goodsissuerequest2Component', () => {
  let component: Goodsissuerequest2Component;
  let fixture: ComponentFixture<Goodsissuerequest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Goodsissuerequest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Goodsissuerequest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
