import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkrequestComponent } from './workrequest.component';

describe('WorkrequestComponent', () => {
  let component: WorkrequestComponent;
  let fixture: ComponentFixture<WorkrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
