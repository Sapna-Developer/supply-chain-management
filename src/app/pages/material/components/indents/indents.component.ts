import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-indents',
  templateUrl: './indents.component.html',
  styleUrls: ['./indents.component.scss'],
})
export class IndentsComponent implements OnInit {
  tableData$: any = [];
  displayedColumns: string[] = [
    'ref_no',
    'confirmation_id',
    'initiated_on',
    'comments',
    'status',
  ];
  @ViewChild(MatPaginator) paginator: any;

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 10;
  pageNumber = 1;
  stages$ = [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Initiate',
      value: 'initiate',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
