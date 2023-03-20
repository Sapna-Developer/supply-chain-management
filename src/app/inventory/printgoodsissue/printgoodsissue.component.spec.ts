import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintgoodsissueComponent } from './printgoodsissue.component';

describe('PrintgoodsissueComponent', () => {
  let component: PrintgoodsissueComponent;
  let fixture: ComponentFixture<PrintgoodsissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintgoodsissueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintgoodsissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
