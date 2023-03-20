import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDrawingsComponent } from './external-drawings.component';

describe('ExternalDrawingsComponent', () => {
  let component: ExternalDrawingsComponent;
  let fixture: ComponentFixture<ExternalDrawingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalDrawingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDrawingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
