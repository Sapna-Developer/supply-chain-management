import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcompletionComponent } from './workcompletion.component';

describe('WorkcompletionComponent', () => {
  let component: WorkcompletionComponent;
  let fixture: ComponentFixture<WorkcompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkcompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkcompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
