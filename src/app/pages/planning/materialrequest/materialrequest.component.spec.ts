import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialrequestComponent } from './materialrequest.component';

describe('MaterialrequestComponent', () => {
  let component: MaterialrequestComponent;
  let fixture: ComponentFixture<MaterialrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
