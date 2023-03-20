import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersignaturelevelComponent } from './workordersignaturelevel.component';

describe('WorkordersignaturelevelComponent', () => {
  let component: WorkordersignaturelevelComponent;
  let fixture: ComponentFixture<WorkordersignaturelevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkordersignaturelevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersignaturelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
