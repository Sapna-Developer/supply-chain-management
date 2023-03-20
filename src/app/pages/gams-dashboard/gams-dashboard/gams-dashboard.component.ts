import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import * as moment from "moment";
@Component({
  selector: 'app-gams-dashboard',
  templateUrl: './gams-dashboard.component.html',
  styleUrls: ['./gams-dashboard.component.scss']
})

export class GamsDashboardComponent implements OnInit {
  displayedColumnsList: any[] = [
    "sno",
    "date",
    "From_Company",
    "To_Company",
  ];
  displayedColumnsList1: any[] = [
    "sno",
    "Company_Name",
    "Open",
    "Closed",
    "Total"
  ];
  reaData: boolean=false;
  totalRecords: any;
  pageIndex: any = 1;
  pageSize: any = 5;
  dataSourceList = new MatTableDataSource();
  dataSourceList1 = new MatTableDataSource();
  reaData1: boolean=false;
  totalRecords1: any;
  total: any;
  data: any;
  startDate: Date | undefined;
  endDate: Date | undefined;
  calendarMaxDate: Date = new Date();
  maxDate: Date = this.calendarMaxDate;
  date: string;
  // dataSourceList1 = new MatTableDataSource();

  constructor( private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.date= moment(new Date()).format("DD-MM-YYYY")
    this.getData();
    this.getRGPData();
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();

  }
  onpageevent1(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
     this.getRGPData();

  }
 
  getData() {
    
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
   
      // "key": ""
    };
    this.custservice.GoodsInTransit(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }

  getRGPData() {
    
    let obj = {
      command: "dsb",
      lmt: this.pageSize,
      pid: this.pageIndex,
      from_date:this.startDate,
      to_date:this.endDate
      // "key": ""
    };
    this.custservice.getRGPData(obj).subscribe((res: any) => {
      this.reaData1 = false;
      this.totalRecords1 = res?.count;
      // this.data=res.data
      this.dataSourceList1.data = res.data;
      if (res.data.length == 0) {
        this.reaData1 = true;
      }
    });
  }
  getTotal(row:any) {
    return (parseInt(row.open) + parseInt(row.close));
  }
  
  startDateChanged(e: any) {
    const date = e.value;
    if (date) {
      const day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();

      if (day < 5) {
        this.maxDate = new Date(year, month, 4, 0, 0, 0, 0);
      } else if (day > 10) {
        if (month === 11) {
          // If month is December
          month = 0;
          year += 1;
        } else {
          month += 1;
        }
        this.maxDate = new Date(year, month, 4, 0, 0, 0, 0);
      }
    } else {
      this.maxDate = this.calendarMaxDate;
    }
  }

}
