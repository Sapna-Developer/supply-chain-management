import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintqsdservicesComponent } from './printqsdservices.component';

describe('PrintqsdservicesComponent', () => {
  let component: PrintqsdservicesComponent;
  let fixture: ComponentFixture<PrintqsdservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintqsdservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintqsdservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
