import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueLogComponent } from './create-issue-log.component';

describe('CreateIssueLogComponent', () => {
  let component: CreateIssueLogComponent;
  let fixture: ComponentFixture<CreateIssueLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIssueLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIssueLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
