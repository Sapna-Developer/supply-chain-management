import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodFileComponent } from './good-file.component';

describe('GoodFileComponent', () => {
  let component: GoodFileComponent;
  let fixture: ComponentFixture<GoodFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
