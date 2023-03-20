import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import * as XLSX from 'xlsx'; 
import * as moment from 'moment';
@Component({
  selector: 'app-gssreports',
  templateUrl: './gssreports.component.html',
  styleUrls: ['./gssreports.component.scss']
})
export class GssreportsComponent implements OnInit {
  companyData: any;
  inwardcompanyname:any[]=[];
  inwardReportTable:boolean=false;
  inwardfromdate:any[]=[];
  inwardtodate:any[]=[];
  gateInwardData:any[]=[];
  gateInwardTabledata:any[]=[]
  outwardReportTable:boolean=false;
  gateOutwardTableData:any[]=[]
  gateOutwardData:any[]=[]
  outwardcompanyname:any[]=[]
  outwardfromdate:any[]=[]
  outwardtodate:any[]=[]
  gateoutwardRGP:any={}
  gateoutwardNRGP:any={}
  gateoutwardRGPReports:any=[]
  gateoutwardNRGPReports:any=[]
  gateoutwardGI:any={}
  gateoutwardGIReports:any=[]
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
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
  }



  getInwardReport(){
    this.inwardReportTable=true;
    //this.gateInwardData=[]
    let obj = {
      "command" : "siw",
      "from_date" : this.inwardfromdate,
      "to_date" : this.inwardtodate,
      "company_name": this.inwardcompanyname
    }
    console.log(obj)
    this.custservice.getGateInwardReport(obj).subscribe((res:any)=>{
      console.log(res.message);
      this.gateInwardData = res.message
      console.log(this.gateInwardData)
      this.gateInwardTabledata.push(this.gateInwardData)
      console.log(this.gateInwardTabledata)

    })
  }
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  @ViewChild('TABLEgateoutwardRGP', { static: false }) TABLEgateoutwardRGP: ElementRef; 
  @ViewChild('TABLEgateoutwardNRGP', { static: false }) TABLEgateoutwardNRGP: ElementRef; 
  @ViewChild('TABLEgateoutwardGI', { static: false }) TABLEgateoutwardGI: ElementRef; 
  exportExcelinward(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'GateInwardDetails.xlsx');
  }
  getOutwardReport(){
    this.outwardReportTable=true
    let obj={
      "command" : "sow",
      "from_date" : this.outwardfromdate,
      "to_date" : this.outwardtodate,
      "company_name": this.outwardcompanyname
    }
    this.custservice.getGateOutwardReport(obj).subscribe((res:any)=>{
      console.log(res.message)
      this.gateOutwardData = res.message
      console.log(this.gateOutwardData)
      this.gateOutwardTableData.push(this.gateOutwardData)
      console.log(this.gateOutwardTableData)
    })
  }
  exportExceloutward(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'GateOutwardDetails.xlsx');
  }
  clearForminward(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.inwardReportTable=false
  }
  clearFormoutward(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.outwardReportTable = false
  }
  ngOnInit(): void {
    this.getcompanydata();
    //this.getInwardReport();
  }
  getGOrgp(){
    let obj={
      "command":"view",
      "from_date":this.gateoutwardRGP.fromdate,
      "to_date":this.gateoutwardRGP.todate,
      "company_name":this.gateoutwardRGP.companyname
         }
         this.custservice.getGateOutwardRgpReports(obj).subscribe((res:any)=>{
          if(res&&res['status_code']===200){
           this.gateoutwardRGPReports=res.data
          }
         })
  }
  getHeadersRGP() {
    let headers: string[] = [];
    if(this.gateoutwardRGPReports) {
      this.gateoutwardRGPReports.forEach((value:any) => {
        // value['Date']=moment(value.Date).format('YYYY-MM-DD');
        // if(value['Lr_Date']!==null){
        //   value['Lr_Date']=moment(value.Lr_Date).format('YYYY-MM-DD');
        // }
        // // if(value['Expected_Return_Date']!==null){
        // //   value['Expected_Return_Date']=moment(value.Expected_Return_Date).format('YYYY-MM-DD');
        // // }
        // if(value['Gate_Outward_Date']!==null){
        //   value['Gate_Outward_Date']=moment(value.Gate_Outward_Date).format('YYYY-MM-DD');
        // }if(value['Unit_Price']!==null){
        //   value['Unit_Price']=parseFloat(value.Unit_Price).toFixed(2)
        // }if(value['Total_Price']!==null){
        //   value['Total_Price']=parseFloat(value.Total_Price).toFixed(2)
        // }
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  GOrgpclearForm(){
    (<HTMLFormElement>document.getElementById("gorgpform")).reset();
    this.gateoutwardRGPReports=[]
  }
  exportExcelGOrgp(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgateoutwardRGP.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GateOutwardRGPData${moment().format('L')}.xlsx`); 
  }

  getGOnrgp(){
    let obj={
      "command":"view",
      "from_date":this.gateoutwardNRGP.fromdate,
      "to_date":this.gateoutwardNRGP.todate,
      "company_name":this.gateoutwardNRGP.companyname
         }
         this.custservice.getGateOutwardNRGPReports(obj).subscribe((res:any)=>{
          if(res&&res['status_code']===200){
           this.gateoutwardNRGPReports=res.data
          }
         })
  }
  getHeadersNRGP() {
    let headers: string[] = [];
    if(this.gateoutwardNRGPReports) {
      this.gateoutwardNRGPReports.forEach((value:any) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  GOnrgpclearForm(){
    (<HTMLFormElement>document.getElementById("gonrgpform")).reset();
    this.gateoutwardNRGPReports=[]
  }
  exportExcelGOnrgp(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgateoutwardNRGP.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GateOutwardNRGPData${moment().format('L')}.xlsx`); 
  }
  getGOGI(){
    let obj={
      "command":"view",
      "from_date":this.gateoutwardGI.fromdate,
      "to_date":this.gateoutwardGI.todate,
      "company_name":this.gateoutwardGI.companyname
         }
         this.custservice.getGIReportsData(obj).subscribe((res:any)=>{
          if(res&&res['status_code']===200){
           this.gateoutwardGIReports=res.data
          }
         })
  }
  getHeadersGI() {
    let headers: string[] = [];
    if(this.gateoutwardGIReports) {
      this.gateoutwardGIReports.forEach((value:any) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  GOgiclearForm(){
    (<HTMLFormElement>document.getElementById("goGIform")).reset();
    this.gateoutwardGIReports=[]
  }
  exportExcelGOGI(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgateoutwardGI.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GateOutwardGIData${moment().format('L')}.xlsx`); 
  }
}
