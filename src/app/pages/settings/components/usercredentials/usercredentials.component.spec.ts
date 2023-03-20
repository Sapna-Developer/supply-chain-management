import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercredentialsComponent } from './usercredentials.component';

describe('UsercredentialsComponent', () => {
  let component: UsercredentialsComponent;
  let fixture: ComponentFixture<UsercredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
