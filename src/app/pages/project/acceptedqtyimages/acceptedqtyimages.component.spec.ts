import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedqtyimagesComponent } from './acceptedqtyimages.component';

describe('AcceptedqtyimagesComponent', () => {
  let component: AcceptedqtyimagesComponent;
  let fixture: ComponentFixture<AcceptedqtyimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedqtyimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedqtyimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
