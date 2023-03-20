import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dmr2Component } from './dmr2.component';

describe('Dmr2Component', () => {
  let component: Dmr2Component;
  let fixture: ComponentFixture<Dmr2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dmr2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dmr2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
