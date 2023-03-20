import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglematerialstockComponent } from './singlematerialstock.component';

describe('SinglematerialstockComponent', () => {
  let component: SinglematerialstockComponent;
  let fixture: ComponentFixture<SinglematerialstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglematerialstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglematerialstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
