import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoFilesComponent } from './wo-files.component';

describe('WoFilesComponent', () => {
  let component: WoFilesComponent;
  let fixture: ComponentFixture<WoFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
