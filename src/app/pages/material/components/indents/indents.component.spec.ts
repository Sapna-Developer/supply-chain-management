import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentsComponent } from './indents.component';

describe('IndentsComponent', () => {
  let component: IndentsComponent;
  let fixture: ComponentFixture<IndentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
