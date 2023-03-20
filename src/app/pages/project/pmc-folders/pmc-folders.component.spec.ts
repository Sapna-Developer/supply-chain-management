import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmcFoldersComponent } from './pmc-folders.component';

describe('PmcFoldersComponent', () => {
  let component: PmcFoldersComponent;
  let fixture: ComponentFixture<PmcFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmcFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmcFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
