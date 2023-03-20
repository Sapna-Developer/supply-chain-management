import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysComponent } from './companys.component';

describe('CompanysComponent', () => {
  let component: CompanysComponent;
  let fixture: ComponentFixture<CompanysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
