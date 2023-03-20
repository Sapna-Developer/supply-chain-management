import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgatepassrgpSignatureLevelComponent } from './outgatepassrgp-signature-level.component';

describe('OutgatepassrgpSignatureLevelComponent', () => {
  let component: OutgatepassrgpSignatureLevelComponent;
  let fixture: ComponentFixture<OutgatepassrgpSignatureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgatepassrgpSignatureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgatepassrgpSignatureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
