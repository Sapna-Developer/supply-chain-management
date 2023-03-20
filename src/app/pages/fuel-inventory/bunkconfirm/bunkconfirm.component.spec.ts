import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunkconfirmComponent } from './bunkconfirm.component';

describe('BunkconfirmComponent', () => {
  let component: BunkconfirmComponent;
  let fixture: ComponentFixture<BunkconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunkconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunkconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
