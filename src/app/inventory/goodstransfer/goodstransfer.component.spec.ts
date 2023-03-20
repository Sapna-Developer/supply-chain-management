import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodstransferComponent } from './goodstransfer.component';

describe('GoodstransferComponent', () => {
  let component: GoodstransferComponent;
  let fixture: ComponentFixture<GoodstransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodstransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodstransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
