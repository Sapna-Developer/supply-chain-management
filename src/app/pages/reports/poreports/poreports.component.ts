import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import * as XLSX from 'xlsx'; 
import * as moment from 'moment';
@Component({
  selector: 'app-poreports',
  templateUrl: './poreports.component.html',
  styleUrls: ['./poreports.component.scss']
})
export class PoreportsComponent implements OnInit {

  companyData: any;
  potdateTable:boolean=false;
  potdatecompanyname:any[]=[];
  potdatetodate:any[]=[];
  potdatefromdate:any[]=[];
  potdateData:any[]=[];
  potdateTableData:any[]=[]
  potnumberTable:boolean=false;
  potnumberTableData:any[]=[]
  potnumnerData:any[]=[]
  potnumcompanyname:any
  potnumtodate:any[]=[]
  potnumfromdate:any[]=[]
  purchaseOrderData:any[]=[]
  potnumPurchaseRequestData:any[]=[]




  constructor(
    public custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
  ) { }

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

  getpotdateData(){
    this.potdateTable=true;
    let obj = {
      "command" : "pot_2",
      "from_date" : this.potdatefromdate,
      "to_date" : this.potdatetodate,
      "company_name": this.potdatecompanyname
    }
    console.log(obj)
    this.custservice.getPotDateData(obj).subscribe((res:any)=>{
      console.log(res.message);
      this.potdateData = res.message
      console.log(this.potdateData)
      this.potdateTableData.push(this.potdateData)
      console.log(this.potdateTableData)

    })
  }
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  exportExcelpotDate(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `PO Reports_${moment().format('L')}.xlsx`);
  }
  getpotnumData(){
    console.log(this.potnumcompanyname);
    
    this.potnumberTable=true
    let obj={
      "command" : "pot_1",
      "number" : this.potnumPurchaseRequestData,
      "company_name" : this.potnumcompanyname
    }
    this.custservice.getPotNumData(obj).subscribe((res:any)=>{
      console.log(obj)
      console.log(res.message)
      this.potnumnerData = res.message
      console.log(this.potnumnerData)
      this.potnumberTableData.push(this.potnumnerData)
      console.log(this.potnumberTableData)
    })
  }
  exportExcelpotNum(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `PO Reports Number_${moment().format('L')}.xlsx`);
  }
  clearpotDatedata(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.potdateTable=false
  }
  clearpotnumdata(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.potnumberTable = false
  }
  ngOnInit(): void {
    this.getcompanydata();
    //this.getInwardReport();
    this.getData();
  }
  getData() {
    let obj = {
      "command": "lst",
      "lmt": 1000000,
      "pid": 1,
    }
    this.custservice.getpurchaseorderdata(obj).subscribe((res: any) => {
      console.log(obj)
      console.log(res.data);
      this.purchaseOrderData = res.data
  })
}

}
