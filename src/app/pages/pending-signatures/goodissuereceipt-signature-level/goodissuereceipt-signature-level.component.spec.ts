import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodissuereceiptSignatureLevelComponent } from './goodissuereceipt-signature-level.component';

describe('GoodissuereceiptSignatureLevelComponent', () => {
  let component: GoodissuereceiptSignatureLevelComponent;
  let fixture: ComponentFixture<GoodissuereceiptSignatureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodissuereceiptSignatureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodissuereceiptSignatureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
