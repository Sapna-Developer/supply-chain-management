import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateinwardComponent } from './gateinward.component';

describe('GateinwardComponent', () => {
  let component: GateinwardComponent;
  let fixture: ComponentFixture<GateinwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateinwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
