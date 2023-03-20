import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintsitesheetComponent } from './printsitesheet.component';

describe('PrintsitesheetComponent', () => {
  let component: PrintsitesheetComponent;
  let fixture: ComponentFixture<PrintsitesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintsitesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintsitesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
