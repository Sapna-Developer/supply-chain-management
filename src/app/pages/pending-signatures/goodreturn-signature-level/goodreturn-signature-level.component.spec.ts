import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodreturnSignatureLevelComponent } from './goodreturn-signature-level.component';

describe('GoodreturnSignatureLevelComponent', () => {
  let component: GoodreturnSignatureLevelComponent;
  let fixture: ComponentFixture<GoodreturnSignatureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodreturnSignatureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodreturnSignatureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
