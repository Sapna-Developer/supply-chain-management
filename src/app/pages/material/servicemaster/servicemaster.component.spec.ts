import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicemasterComponent } from './servicemaster.component';

describe('ServicemasterComponent', () => {
  let component: ServicemasterComponent;
  let fixture: ComponentFixture<ServicemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
