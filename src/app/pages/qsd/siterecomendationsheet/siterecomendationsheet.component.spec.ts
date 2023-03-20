import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiterecomendationsheetComponent } from './siterecomendationsheet.component';

describe('SiterecomendationsheetComponent', () => {
  let component: SiterecomendationsheetComponent;
  let fixture: ComponentFixture<SiterecomendationsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiterecomendationsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiterecomendationsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
