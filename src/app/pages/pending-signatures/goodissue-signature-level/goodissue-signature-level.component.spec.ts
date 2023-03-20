import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodissueSignatureLevelComponent } from './goodissue-signature-level.component';

describe('GoodissueSignatureLevelComponent', () => {
  let component: GoodissueSignatureLevelComponent;
  let fixture: ComponentFixture<GoodissueSignatureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodissueSignatureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodissueSignatureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
