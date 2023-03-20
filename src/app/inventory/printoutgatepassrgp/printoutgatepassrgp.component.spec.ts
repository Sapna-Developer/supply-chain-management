import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintoutgatepassrgpComponent } from './printoutgatepassrgp.component';

describe('PrintoutgatepassrgpComponent', () => {
  let component: PrintoutgatepassrgpComponent;
  let fixture: ComponentFixture<PrintoutgatepassrgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintoutgatepassrgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintoutgatepassrgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
