import { AuthService } from './../../../auth/auth.service';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertCallsService } from './../../../auth/alert-calls.service';
import { PoDetailsComponent } from './../po-details/po-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-po-files',
  templateUrl: './po-files.component.html',
  styleUrls: ['./po-files.component.scss'],
})
export class PoFilesComponent implements OnInit {
  tableData$ = [];
  displayedColumns: string[] = [
    'sno',
    'description',
    'uom',
    'pr_qty',
    // 'status',
    'created_date',
    'created_by',
    'updated_date',
    'updated_by',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any;

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 10;
  pageNumber = 1;
  tempTableData$: any = [];

  poFileData: any = {};
  tempFileId: any;

  title = 'PO Uploads';
  uploadType = 'po';

  searchParamsData: any = {};

  gepsNoValue: any;
  searchGepsNo = new Subject<string>();

  searchVendorNameValue = new Subject<string>();
  vendorNameValue: any;

  searchVendorMobileNumber = new Subject<string>();
  vendorMobileValue: any;

  searchVendorEmail = new Subject<string>();
  vendorEmailValue: any;

  searchOrderNo = new Subject<string>();
  orderNoValue: any;

  constructor(
    public customerService: CustomerService,
    public dialog: MatDialog,
    public alertCall: AlertCallsService,
    public router: Router,
    public authService: AuthService
  ) {
    if (this.router.url === '/cp/wo') {
      this.title = 'WO Uploads';
      this.uploadType = 'wo';
    }
  }

  ngOnInit(): void {
    this.searchGepsNo
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value: any) => {
        this.callFilters();
      });

    this.searchVendorNameValue
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value: any) => {
        this.callFilters();
      });

    this.searchVendorMobileNumber
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value: any) => {
        this.callFilters();
      });

    this.searchVendorEmail
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value: any) => {
        this.callFilters();
      });

    this.searchOrderNo
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((value: any) => {
        this.callFilters();
      });

    this.getPODetails();
  }

  callFilters() {
    this.searchParamsData = {
      email: this.vendorEmailValue,
      mobile: this.vendorMobileValue,
      vendor: this.vendorNameValue,
      geps: this.gepsNoValue,
      order_no: this.orderNoValue,
    };
    this.getPODetails();
  }

  getPODetails() {
    let params: HttpParams;

    params = new HttpParams().set('upload_type', this.uploadType);

    if (this.searchParamsData && this.searchParamsData.geps) {
      params = params.append('geps_no', this.searchParamsData.geps);
    }
    if (this.searchParamsData && this.searchParamsData.vendor) {
      params = params.append('vendor_name', this.searchParamsData.vendor);
    }
    if (this.searchParamsData && this.searchParamsData.mobile) {
      params = params.append('vendor_mobile_no', this.searchParamsData.mobile);
    }
    if (this.searchParamsData && this.searchParamsData.email) {
      params = params.append('vendor_mail_id', this.searchParamsData.email);
    }

    if (this.searchParamsData && this.searchParamsData.order_no) {
      params = params.append('order_no', this.searchParamsData.order_no);
    }

    this.loadingRecords = true;
    this.customerService.getPODetails(params).subscribe(
      (resp: any) => {
        this.loadingRecords = false;
        if (resp && resp.status_code === 200) {
          this.tableData$ = resp.data;
          this.totalRecords = resp.data.length;
        } else {
          this.tableData$ = [];
          this.totalRecords = 0;
        }
      },
      (err) => {
        this.loadingRecords = false;
      }
    );
  }

  openDetails(ticket: any) {
    const dialogRef = this.dialog.open(PoDetailsComponent, {
      data: {
        ticketObj: ticket,
      },
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  uploadFile(fileInput: any, content: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      const file = fileInput.target.files;
      const postData = new FormData();
      postData.append('file', file[0]);
      postData.append('upload_type', this.uploadType);

      this.customerService.uploadPOFile(postData).subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.poFileData = resp.data;
          this.tempFileId = resp.temp_id;
          this.poFileData.id = this.tempFileId;

          this.openTempModel(content);
        } else {
          this.alertCall.showWarning('File', resp.message);
        }
      });
    }
  }

  openTempModel(Content: any) {
    const dialogRef = this.dialog.open(Content, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getPODetails();
    });
  }

  updateFile() {
    // let params: HttpParams;

    // params = new HttpParams()
    //   .set('temp_id', this.tempFileId)
    //   .set('upload_type', this.uploadType);
    const lists = this.poFileData.items;
    delete this.poFileData.items;
    const params: any = {
      temp_id: this.tempFileId,
      upload_type: this.uploadType,
      is_edit: true,
      ...this.poFileData,
      items_list: lists,
    };

    this.customerService.updatePOFile(params).subscribe((resp: any) => {
      if (resp && resp.status_code === 200) {
        this.alertCall.showSuccess('File Uploaded Successfully', 'PO File');
        this.dialog.closeAll();
      } else {
        this.alertCall.showWarning('File', resp.message);
      }
    });
  }

  cancelFile() {
    this.customerService
      .cancelPoFile(this.tempFileId)
      .subscribe((resp: any) => {
        if (resp && resp.status_code === 200) {
          this.alertCall.showWarning('File Cancelled Successfully', 'PO File');
          this.dialog.closeAll();
        }
      });
  }

  searchParams(data: any) {
    this.searchParamsData = data;
    this.getPODetails();
  }
}
