import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsissueComponent } from './goodsissue.component';

describe('GoodsissueComponent', () => {
  let component: GoodsissueComponent;
  let fixture: ComponentFixture<GoodsissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsissueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
