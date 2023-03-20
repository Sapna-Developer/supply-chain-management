import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFoldersComponent } from './project-folders.component';

describe('ProjectFoldersComponent', () => {
  let component: ProjectFoldersComponent;
  let fixture: ComponentFixture<ProjectFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
