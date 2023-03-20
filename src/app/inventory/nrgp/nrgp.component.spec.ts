import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrgpComponent } from './nrgp.component';

describe('NrgpComponent', () => {
  let component: NrgpComponent;
  let fixture: ComponentFixture<NrgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NrgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
