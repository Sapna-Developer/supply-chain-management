import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompaniesComponent } from './user-companies.component';

describe('UserCompaniesComponent', () => {
  let component: UserCompaniesComponent;
  let fixture: ComponentFixture<UserCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
