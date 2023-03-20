import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import * as XLSX from 'xlsx';
import * as moment from 'moment';
@Component({
  selector: 'app-prreports',
  templateUrl: './prreports.component.html',
  styleUrls: ['./prreports.component.scss']
})
export class PrreportsComponent implements OnInit {

  companyData: any;
  prtdateTable: boolean = false;
  prtdatecompanyname: any[] = [];
  prtdatetodate: any[] = [];
  prtdatefromdate: any[] = [];
  prtdateData: any[] = [];
  prtdateTableData: any[] = []
  prtnumberTable: boolean = false;
  prtnumberTableData: any[] = []
  prtnumnerData: any[] = []
  prtnumcompanyname: string
  prtnumtodate: any[] = []
  prtnumfromdate: any[] = []
  purchaseRequestdata:any[]=[];
  prtnumPurchaseRequestData:any[]=[]




  constructor(
    public custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
  ) { }
  clearprtnumdata(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.prtnumberTable=false
  }
  clearprtDatedata(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.prtdateTable = false
  }
  getcompanydata() {
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }

  getprtdateData() {
    this.prtdateTable = true;
    let obj = {
      "command": "prt_2",
      "from_date": this.prtdatefromdate,
      "to_date": this.prtdatetodate,
      "company_name": this.prtdatecompanyname
    }
    console.log(obj)
    this.custservice.getPrtDateData(obj).subscribe((res: any) => {
      console.log(res.message);
      this.prtdateData = res.message
      console.log(this.prtdateData)
      this.prtdateTableData.push(this.prtdateData)
      console.log(this.prtdateTableData)

    })
  }
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  exportExcelprtDate() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `PR Reports_${moment().format('L')}.xlsx`);
  }
  getprtnumData() {
    this.prtnumberTable = true
    let obj = {
      "command": "prt_1",
      "number":this.prtnumPurchaseRequestData,
      "company_name" : this.prtnumcompanyname
    }
    this.custservice.getPrtNumData(obj).subscribe((res: any) => {
      console.log(obj)
      console.log(res.message)
      this.prtnumnerData = res.message
      console.log(this.prtnumnerData)
      this.prtnumberTableData.push(this.prtnumnerData)
      console.log(this.prtnumberTableData)
    })
  }
  exportExcelprtNum() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `PR Reports Number_${moment().format('L')}.xlsx`);
  }
  clearpotDatedata() {
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.prtdateTable = false
  }
  clearpotnumdata() {
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.prtnumberTable = false
  }
  getData() {
    let obj = {
      "command": "lst",
      "lmt": 1000000, 
      "pid": 1,
    }
    this.custservice.getpurchaseRequestdata(obj).subscribe((res: any) => {
      console.log(obj)
      console.log(res.data);
      this.purchaseRequestdata = res.data
  })
}

  ngOnInit(): void {
    this.getcompanydata();
    //this.getInwardReport();
    this.getData();
  }


}
