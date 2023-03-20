import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubContractGoodsIssueComponent } from './sub-contract-goods-issue.component';

describe('SubContractGoodsIssueComponent', () => {
  let component: SubContractGoodsIssueComponent;
  let fixture: ComponentFixture<SubContractGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubContractGoodsIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubContractGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
