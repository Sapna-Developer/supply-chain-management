import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintgoodsreturnComponent } from './printgoodsreturn.component';

describe('PrintgoodsreturnComponent', () => {
  let component: PrintgoodsreturnComponent;
  let fixture: ComponentFixture<PrintgoodsreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintgoodsreturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintgoodsreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
