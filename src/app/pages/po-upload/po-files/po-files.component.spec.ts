import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoFilesComponent } from './po-files.component';

describe('PoFilesComponent', () => {
  let component: PoFilesComponent;
  let fixture: ComponentFixture<PoFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
