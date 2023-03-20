import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskImagesComponent } from './task-images.component';

describe('TaskImagesComponent', () => {
  let component: TaskImagesComponent;
  let fixture: ComponentFixture<TaskImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
