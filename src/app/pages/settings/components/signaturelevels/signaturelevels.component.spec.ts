import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturelevelsComponent } from './signaturelevels.component';

describe('SignaturelevelsComponent', () => {
  let component: SignaturelevelsComponent;
  let fixture: ComponentFixture<SignaturelevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignaturelevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturelevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
