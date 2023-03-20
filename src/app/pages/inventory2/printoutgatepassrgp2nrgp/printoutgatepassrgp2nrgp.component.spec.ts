import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Printoutgatepassrgp2nrgpComponent } from './printoutgatepassrgp2nrgp.component';

describe('Printoutgatepassrgp2nrgpComponent', () => {
  let component: Printoutgatepassrgp2nrgpComponent;
  let fixture: ComponentFixture<Printoutgatepassrgp2nrgpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Printoutgatepassrgp2nrgpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Printoutgatepassrgp2nrgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
