import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkrequestsignaturelevelComponent } from './workrequestsignaturelevel.component';

describe('WorkrequestsignaturelevelComponent', () => {
  let component: WorkrequestsignaturelevelComponent;
  let fixture: ComponentFixture<WorkrequestsignaturelevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkrequestsignaturelevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkrequestsignaturelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
