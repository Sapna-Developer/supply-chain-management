import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printgoodsissuerequest2Component } from './printgoodsissuerequest2.component';

describe('Printgoodsissuerequest2Component', () => {
  let component: Printgoodsissuerequest2Component;
  let fixture: ComponentFixture<Printgoodsissuerequest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printgoodsissuerequest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printgoodsissuerequest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
