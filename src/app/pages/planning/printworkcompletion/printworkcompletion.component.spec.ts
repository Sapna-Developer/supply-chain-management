import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintworkcompletionComponent } from './printworkcompletion.component';

describe('PrintworkcompletionComponent', () => {
  let component: PrintworkcompletionComponent;
  let fixture: ComponentFixture<PrintworkcompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintworkcompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintworkcompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
