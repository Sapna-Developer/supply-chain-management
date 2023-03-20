import { AddEmailComponent } from './../add-email/add-email.component';
import { AuthService } from './../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { GreenkoUtils } from 'src/app/utils/flip.utils';
import { CustomerService } from './../../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  projectObj: any = {
    data: {
      title: null,
      wbs_data: [],
    },
  };

  startDate: any;
  endDate: any;
  projectId: any;
  projectName: any;

  tableData$ = [];

  displayedColumns: string[] = ['sno', 'emails', 'created_date', 'action'];
  @ViewChild(MatPaginator) paginator: any;

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 10;
  pageNumber = 1;

  poFileData: any;

  constructor(
    public route: ActivatedRoute,
    public customerService: CustomerService,
    public utils: GreenkoUtils,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.route.queryParams.subscribe((resp: any) => {
      if (resp) {
        this.projectId = resp.id;
        this.startDate = resp.start;
        this.endDate = resp.end;
        this.projectName = resp.name;
        this.getDataObj();
      }
    });
  }

  ngOnInit(): void {}

  getDataObj() {
    let params: HttpParams;
    params = new HttpParams().set('project_id', this.projectId.toString());
    this.customerService.getProjectEmails(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.tableData$ = resp.data || [];
        this.totalRecords = this.tableData$.length;
      }
    });
  }

  addNewEmails(data: any) {
    const dialogRef = this.dialog.open(AddEmailComponent, {
      data: {
        emails: data,
        projectId: this.projectId,
      },
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.getDataObj();
    });
  }
}
