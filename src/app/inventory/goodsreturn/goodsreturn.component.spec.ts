import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsreturnComponent } from './goodsreturn.component';

describe('GoodsreturnComponent', () => {
  let component: GoodsreturnComponent;
  let fixture: ComponentFixture<GoodsreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsreturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
