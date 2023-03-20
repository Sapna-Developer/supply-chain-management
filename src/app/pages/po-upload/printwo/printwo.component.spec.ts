import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintwoComponent } from './printwo.component';

describe('PrintwoComponent', () => {
  let component: PrintwoComponent;
  let fixture: ComponentFixture<PrintwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
