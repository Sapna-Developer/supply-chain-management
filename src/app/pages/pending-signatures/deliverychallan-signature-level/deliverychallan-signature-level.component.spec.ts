import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverychallanSignatureLevelComponent } from './deliverychallan-signature-level.component';

describe('DeliverychallanSignatureLevelComponent', () => {
  let component: DeliverychallanSignatureLevelComponent;
  let fixture: ComponentFixture<DeliverychallanSignatureLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverychallanSignatureLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverychallanSignatureLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
