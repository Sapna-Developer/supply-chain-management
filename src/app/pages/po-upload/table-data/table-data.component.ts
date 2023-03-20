import { AuthService } from './../../../auth/auth.service';
import { GoodFileComponent } from './../good-file/good-file.component';
import { environment } from './../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  @Input()
  tableData$ = [];

  @Input()
  uploadType = 'po';

  displayedColumns: string[] = [
    'sno',
    'geps_no',
    'vendor_name',
    'vendor_mobile_no',
    'vendor_mail_id',
    // 'vendor_address',
    'uploaded_date',
    'uploaded_by',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any;

  loadingRecords = false;
  totalRecords = 0;
  recordsPerPage = 10;
  pageNumber = 1;

  poFileData: any;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  imageUrl = environment.base_url;

  secondCols$: any = [
    'header_sno',
    'header_geps_no',
    'header_vendor_name',
    'header_vendor_mobile_no',
    'header_vendor_mail_id',
    'header_uploaded_date',
    'header_uploaded_by',
    'header_action',
  ];

  gepsNoValue: any;
  searchGepsNo = new Subject<string>();

  searchVendorNameValue = new Subject<string>();
  vendorNameValue: any;

  searchVendorMobileNumber = new Subject<string>();
  vendorMobileValue: any;

  searchVendorEmail = new Subject<string>();
  vendorEmailValue: any;

  constructor(public dialog: MatDialog, public authService: AuthService) {}

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
  }

  callFilters() {
    this.passEntry.emit({
      email: this.vendorEmailValue,
      mobile: this.vendorMobileValue,
      vendor: this.vendorNameValue,
      geps: this.gepsNoValue,
    });
  }

  openTempModel(data: any, Content: any) {
    this.poFileData = data;
    const dialogRef = this.dialog.open(Content, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.passEntry.emit({ type: 'get' });
    });
  }

  openFiles(data: any, Content: any) {
    this.poFileData = data;
    const dialogRef = this.dialog.open(Content, {
      data: {},
      hasBackdrop: true,
      // backdropClass: 'modal-background',
      panelClass: 'form-dialogs',
      width: '20%',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  showFile(file: any) {
    const url = this.imageUrl + '/' + file;
    window.open(url, '_blank');
  }

  openGoodsReceipt(file: any) {
    const dialogRef = this.dialog.open(GoodFileComponent, {
      data: {
        id: file.id,
        supplier_name: file.vendor_name,
      },
      hasBackdrop: true,
      panelClass: 'form-dialogs',
      width: '70%',
    });
  }
}
