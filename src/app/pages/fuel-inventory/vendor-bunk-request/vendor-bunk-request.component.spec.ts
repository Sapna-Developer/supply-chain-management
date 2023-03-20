import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBunkRequestComponent } from './vendor-bunk-request.component';

describe('VendorBunkRequestComponent', () => {
  let component: VendorBunkRequestComponent;
  let fixture: ComponentFixture<VendorBunkRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBunkRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBunkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
