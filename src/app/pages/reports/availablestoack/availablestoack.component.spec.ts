import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablestoackComponent } from './availablestoack.component';

describe('AvailablestoackComponent', () => {
  let component: AvailablestoackComponent;
  let fixture: ComponentFixture<AvailablestoackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablestoackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablestoackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
