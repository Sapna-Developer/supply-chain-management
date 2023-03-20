import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialreceiptComponent } from './materialreceipt.component';

describe('MaterialreceiptComponent', () => {
  let component: MaterialreceiptComponent;
  let fixture: ComponentFixture<MaterialreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialreceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
