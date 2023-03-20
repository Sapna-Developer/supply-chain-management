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
  selector: 'app-projectdashboard',
  templateUrl: './projectdashboard.component.html',
  styleUrls: ['./projectdashboard.component.scss']
})
export class ProjectdashboardComponent implements OnInit {
  displayedColumnsList: any[] = [
    "sno",
    "PO_NO",
    "Value",
    "Pending",
    "Completed",
  ];
  displayedColumnsList1: any[] = [
    "sno",
    "WO_NO",
    "Value",
    "Pending",
    "Completed",
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
  selectedVendorName: any;
  vendor_name: any;
  vendor_code: any;
  vendorData: any;
  vendorname:any;
  contractorData: any;
  contractor_code: any;
  contractor_name: any;
  selectedcontractorname: string;
  // dataSourceList1 = new MatTableDataSource();

  constructor( private custservice: CustomerService,
    private alertcall: AlertCallsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.date= moment(new Date()).format("DD-MM-YYYY")
    this.getData();
    this.getWorkOrderData();
    this.getvendordata();
    this.getcontractorData();
  }


  
  // get vendor name in dropdown3
  getvendordata() {
    let obj = {
      command: "lst",
    };
    this.custservice.addvendormaster(obj).subscribe((res: any) => {
      this.vendorData = res.data;
    });
  }

  filterVendorData(ev: any) {
    this.selectedVendorName = ev.target.value;
    console.log(ev.target.value);
    if (this.selectedVendorName > 2) {
      this.getvendordata();
    } else {
      this.getvendordata();
    }
  }
  getVendorCode(){
    this.vendorData.forEach((ele: any) => {
      if (this.vendor_name == ele.name) {
        this.vendor_name = ele.name;
        this.vendor_code = ele.code;
      }
    });
    this.getData();
  }
  //contractor
  filterContractordata(ev:any){
    this.selectedcontractorname = ev.target.value
    if (this.selectedcontractorname.length > 2) {
      this.getcontractorData();
    }
    if (!this.selectedcontractorname) {
      this.getcontractorData();
    }
  }
  getcontractorData(){
    let obj={
      "command" : "lst",
      "lmt":100000,
      "key": this.selectedcontractorname || ""
    }
    this.custservice.getcontractormasterdata(obj).subscribe((res:any)=>{
      this.contractorData = res.data
    })
  }

  getContactorCode() {
    this.contractorData.forEach((ele: any) => {
      console.log(ele);

      if (this.contractor_name == ele.name) {
        this.contractor_code = ele.code;
      }
    });
    this.getWorkOrderData();
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();

  }
  onpageevent1(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
     this.getWorkOrderData();

  }
 
  getData() {
    
    let obj = {
      command: "dsb",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: this.vendorname
    };
    this.custservice.PurchaseOrder(obj).subscribe((res: any) => {
      console.log(res);      
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }

  getWorkOrderData() {
    
    let obj = {
      command: "dsb",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: this.contractor_name
    };
    this.custservice.WorkOrder(obj).subscribe((res: any) => {
      this.reaData1 = false;
      this.totalRecords1 = res?.count;
      // this.data=res.data
      this.dataSourceList1.data = res.data;
      if (res.data.length == 0) {
        this.reaData1 = true;
      }
    });
  }
 
  
  clearwoData(){
    this.contractor_name=""
    setTimeout(() => {   
      this.getWorkOrderData()
    }, 100);
  }
  clearpoData(){
    this.vendorname="";
    setTimeout(() => {   
      this.getData()
    }, 100);
  }

}

