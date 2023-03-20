import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelIssueComponent } from './fuel-issue.component';

describe('FuelIssueComponent', () => {
  let component: FuelIssueComponent;
  let fixture: ComponentFixture<FuelIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
