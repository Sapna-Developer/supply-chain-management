import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-project-log',
  templateUrl: './project-log.component.html',
  styleUrls: ['./project-log.component.scss'],
})
export class ProjectLogComponent implements OnInit {
  projectId: any;
  startDate: any;
  endDate: any;
  projectObj: any = {};

  tableData$ = [];
  displayedColumns: string[] = [
    'component',
    'activity',
    'issueDescription',
    'severity',
    'createDate',
    'closedDate',
    'status',
  ];
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  loadingRecords = false;

  constructor(public route: ActivatedRoute) {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
        this.startDate = resp.start;
        this.endDate = resp.end;
      }
    });
  }

  ngOnInit(): void {}
}
