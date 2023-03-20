import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoExcelUploadComponent } from './po-excel-upload.component';

describe('PoExcelUploadComponent', () => {
  let component: PoExcelUploadComponent;
  let fixture: ComponentFixture<PoExcelUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoExcelUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
