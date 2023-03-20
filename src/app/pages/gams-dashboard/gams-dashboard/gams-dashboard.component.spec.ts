import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamsDashboardComponent } from './gams-dashboard.component';

describe('GamsDashboardComponent', () => {
  let component: GamsDashboardComponent;
  let fixture: ComponentFixture<GamsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
