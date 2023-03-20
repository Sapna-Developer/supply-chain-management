import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsignatureComponent } from './pendingsignature.component';

describe('PendingsignatureComponent', () => {
  let component: PendingsignatureComponent;
  let fixture: ComponentFixture<PendingsignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingsignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingsignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
