import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nrgp2Component } from './nrgp2.component';

describe('Nrgp2Component', () => {
  let component: Nrgp2Component;
  let fixture: ComponentFixture<Nrgp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nrgp2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nrgp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
