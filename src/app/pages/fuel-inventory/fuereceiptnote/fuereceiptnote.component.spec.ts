import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuereceiptnoteComponent } from './fuereceiptnote.component';

describe('FuereceiptnoteComponent', () => {
  let component: FuereceiptnoteComponent;
  let fixture: ComponentFixture<FuereceiptnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuereceiptnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuereceiptnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
