import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsdverificationComponent } from './qsdverification.component';

describe('QsdverificationComponent', () => {
  let component: QsdverificationComponent;
  let fixture: ComponentFixture<QsdverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsdverificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsdverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
