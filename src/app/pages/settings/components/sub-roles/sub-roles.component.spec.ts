import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRolesComponent } from './sub-roles.component';

describe('SubRolesComponent', () => {
  let component: SubRolesComponent;
  let fixture: ComponentFixture<SubRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
