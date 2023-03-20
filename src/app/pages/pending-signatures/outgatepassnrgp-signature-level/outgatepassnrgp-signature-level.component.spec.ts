import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgatepassnrgpSignatureLevelComponent } from './outgatepassnrgp-signature-level.component';

describe('OutgatepassnrgpSignatureLevelComponent', () => {
  let component: OutgatepassnrgpSignatureLevelComponent;
  let fixture: ComponentFixture<OutgatepassnrgpSignatureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgatepassnrgpSignatureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgatepassnrgpSignatureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
