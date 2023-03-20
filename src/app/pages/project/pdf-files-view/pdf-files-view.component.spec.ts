import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFilesViewComponent } from './pdf-files-view.component';

describe('PdfFilesViewComponent', () => {
  let component: PdfFilesViewComponent;
  let fixture: ComponentFixture<PdfFilesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfFilesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfFilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
