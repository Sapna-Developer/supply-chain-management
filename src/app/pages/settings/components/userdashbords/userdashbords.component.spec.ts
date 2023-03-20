import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashbordsComponent } from './userdashbords.component';

describe('UserdashbordsComponent', () => {
  let component: UserdashbordsComponent;
  let fixture: ComponentFixture<UserdashbordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdashbordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdashbordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
