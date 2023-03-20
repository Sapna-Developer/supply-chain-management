import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QsdservicesComponent } from './qsdservices.component';

describe('QsdservicesComponent', () => {
  let component: QsdservicesComponent;
  let fixture: ComponentFixture<QsdservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QsdservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QsdservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
