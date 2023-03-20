import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsreceiptComponent } from './goodsreceipt.component';

describe('GoodsreceiptComponent', () => {
  let component: GoodsreceiptComponent;
  let fixture: ComponentFixture<GoodsreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsreceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
