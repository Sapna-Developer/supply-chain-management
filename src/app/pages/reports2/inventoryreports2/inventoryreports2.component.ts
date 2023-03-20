import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
import { AuthService } from "src/app/auth/auth.service";
import * as XLSX from 'xlsx'; 
import * as moment from "moment";
import { formatCurrency } from "@angular/common";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-inventoryreports2',
  templateUrl: './inventoryreports2.component.html',
  styleUrls: ['./inventoryreports2.component.scss']
})
export class Inventoryreports2Component implements OnInit {
  // toppings = new FormControl();
  displayedColumns: any[] = [
    "sno",
    "mat_code",
    "mat_description",
    "valuation_type",
    "available_qty",
    "available_value",
  ];
  title = "Goods_Receipt";
  dataForExcel: any[] = [];
  selectedmaterial: any;
  stockstatementdata: any[]=[];
  dmrdata: any[]=[];
  goodsreturndata: any []=[];
  materialmovementdata: any;
  selectematcode1: any;
  selectedmaterial1: any;
  masterData1: any;
  userdetails: any;
  transferType: any;
  materialCODE: any;
  materialNAME: any;
  materialNAME1: any;
  materialCODE1: any;
  selectedmatcode1: any;
  selectedmatname1: any;
  materialmovementdatatest: any;
  materialmovementdatatest1: any;
  mmhheadings: any;
  selectedcontractorname: string;
  contractorData: any;
  fuelreqcontractor_name: any;
  fuelreqcontractor_code: any;
  cstfromdate: any;
  csttodate: any;
  ContractorDataReports:any[]=[];
  testData: any;
  mmhData: SafeHtml;
 

  // @ViewChild("TABLE") table: ElementRef;
  // exportActive: boolean = false;
  export() {
    console.log(this.avaialablestockdata);
    // debugger;
    // this.avaialablestockdata.forEach((row: any) => {
    //   this.dataForExcel.push(Object.values(row));
    // });
    let reportData = {
      title: "Employee Sales Report - Jan 2020",
      // data: Object.values(this.avaialablestockdata[1]),
      data: this.dataForExcel,
      headers: Object.keys(this.avaialablestockdata[0]),
    };
    console.log(this.dataForExcel);


    // this.exportActive = true;
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
    //   this.table.nativeElement
    // );
    // console.log(this.table.nativeElement);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // /* save to file */
    // XLSX.writeFile(wb, "SheetJS.xlsx");
  }

  reaData: boolean;
  totalRecords: any = 0;
  dataSource = new MatTableDataSource();
  // dataSourceReceipt = new MatTableDataSource();
  avaialablestockdata: any[] = [];
  goodsreceiptdata:any[]=[];
  goodstransferdata: any[]=[];
  userData: any[] = [];
  model: any = {};
  companyData: any;
  goodsIssueData: any=[];
  selectedmatcode: any;
  selectematcode: any;
  masterData: any;
  total: any = 0;
  totalvalue: any = 0;
  smsdata: any;
  gifromdate: any[] = [];
  dmrfromdate: any[] = [];
  gtfromdate: any[] = [];
  grfromdate: any[] = [];
  greturnfromdate: any[] = [];
  stkstmtfromdate: any[] = [];
  mmhfromdate: any[] = [];
  gitodate: any[] = [];
  dmrtodate: any[] = [];
  gttodate: any[] = [];
  greturntodate: any[] = [];
  grtodate: any[] = [];
  stkstmttodate: any[] = [];
  mmhtodate: any[] = [];
  companyname: any[] = [];
  valuationtype: any[] = [];
  valuationtype1:any[]=[];
  data: any[] = [];
  MatTableExporter: any;
  valutiondata: any;
  // rest: any[];
  constructor(
    public custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
    private authService:AuthService,
    private sanitized: DomSanitizer
  ) {}
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  @ViewChild('TABLEgoodsissue', { static: false }) TABLEgoodsissue: ElementRef;
  @ViewChild('TABLEstockstmt', { static: false }) TABLEstockstmt: ElementRef; 
  @ViewChild('TABLEgoodstransfer', { static: false }) TABLEgoodstransfer: ElementRef; 
  @ViewChild('TABLEdmr', { static: false }) TABLEdmr: ElementRef; 
  @ViewChild(' TABLEgoodsreceipt', { static: false })  TABLEgoodsreceipt: ElementRef; 
  @ViewChild('TABLEGR', { static: false }) TABLEGR: ElementRef; 
  @ViewChild('TABLEmmh', { static: false }) TABLEmmh: ElementRef; 
  @ViewChild('TABLEcst', { static: false }) TABLEcst: ElementRef; 
  @ViewChild('TABLEcst1', { static: false }) TABLEcst1: ElementRef; 
  ngOnInit(): void {
    this.userdetails = this.authService.currentUserRoleDetails;
    console.log(this.userdetails.app_details.roles[0]);
    this.getvalutionData();
    this.getmasterdata();
  }

 //valuation data
 getvalutionData() {
  let obj = {
    lmt: 100000,
    pid: 1,
    command: "lst",
    key: "",
  };
  this.custservice.getvalutiondata(obj).subscribe((res: any) => {
    this.valutiondata = res.data;
  });
}
//material code 
getmasterdata(){
  let obj={
    "command":'lst',
    "lmt":100,
    "pid":1,
    "key":this.selectedmaterial ||this.selectedmaterial1
  }
  this.custservice.getmaterialmasterdata(obj).subscribe((res:any)=>{
    console.log(res);
    this.masterData=res.data
    
  })
}
//search 
getmaterialDATA(ev:any){
  console.log(ev.target.value);
  this.selectedmaterial=ev.target.value
  if(this.selectedmaterial.length>2){
this.getmasterdata()
  }
  if(! this.selectedmaterial){
    this.getmasterdata()
  }
}

//search 
getmaterialDATA1(ev:any){
  console.log(ev.target.value);
  this.selectedmaterial1=ev.target.value
  if(this.selectedmaterial1.length>2){
this.getmasterdata()
  }
  if(! this.selectedmaterial){
    this.getmasterdata()
  }
}

//contractor
getcontractorData(){
  let obj={
    "command" : "lst",
    "lmt":100,
    "key": this.selectedcontractorname || ""
  }
  this.custservice.getcontractormasterdata(obj).subscribe((res:any)=>{
    this.contractorData = res.data
  })
}
filterContractorData(ev:any){
  this.selectedcontractorname = ev.target.value
  if (this.selectedcontractorname.length > 2) {
    this.getcontractorData();
  }else{
    this.getcontractorData();
  }
  if (!this.selectedcontractorname) {
    this.getcontractorData();
  }
}


getContactorCodefuelreq() {
  this.contractorData.forEach((ele: any) => {
    if (this.fuelreqcontractor_name == ele.name) {
      this.fuelreqcontractor_name = ele.name
      this.fuelreqcontractor_code = ele.code;
    }
  });
  console.log( this.fuelreqcontractor_name);
  console.log(this.fuelreqcontractor_code);
}



selectedmastergroup(){
  console.log(this.model.matcode);
  this.masterData.forEach((ele:any) => {
    if(ele.system_reference_1==this.model.matcode){
      this.materialCODE=ele.code
      this.materialNAME=ele.name
    }
  });
}


//goods issue
  getgoodsissue() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.gifromdate,
      to_date: this.gitodate,
      command: "gin",
    };
    this.custservice.getinventoryreports2(obj).subscribe((data: any) => {
      if(data&&data['status_code']===200){
        this.goodsIssueData=data.data
        console.log(this.goodsIssueData);
        // this.MatTableExporter.exportTable("xlsx");
      }else{
        this.alertcall.showWarning("Alert",data['message'])
      }
    

    });
  }

  getHeaders1() {
    let headers: string[] = [];
    if(this.goodsIssueData) {
      this.goodsIssueData.forEach((value:any) => {
        value['Date']=moment(value.Date).format('YYYY-MM-DD');
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  alignTableColumn(ele:any){
    // {"data": [{"Date": "2022-12-01T00:00:00", "GI_Number": "MIS/22-23/022", "Request_Number": "GIR/22-23/046", "Issue_Type": "Type1", "Material_Code": "3707100001", "Material_Description": "cable 6 sqmm", "UOM": "KM", "Request_Quantity": 56.0, "Issued_Quantity": 56.0, "Unit_Price": 59.14934727849018, "Total_Price": 3312.3634475954505, "Contractor_Name": "AIC VMR PROJECTS PVT. Ltd.,", "Receiver_Name": "test", "Remarks": "testing"}, {"Date": "2022-12-01T00:00:00", "GI_Number": "MIS/22-23/023", "Request_Number": "GIR/22-23/046", "Issue_Type": "Type1", "Material_Code": "3707100001", "Material_Description": "cable 6 sqmm", "UOM": "KM", "Request_Quantity": 56.0, "Issued_Quantity": 56.0, "Unit_Price": 59.14934727849013, "Total_Price": 3312.3634475954473, "Contractor_Name": "AIC VMR PROJECTS PVT. Ltd.,", "Receiver_Name": "test", "Remarks": "testing"}], "status_code": 200}
    var rData='left';
    if(ele == 'Request_Quantity' || ele== 'Issued_Quantity' || ele=='Unit_Price' || ele == 'Total_Price'){
      rData='right';
    }else if (ele== 'Date'){
      rData='center';
    }

    return rData;
  }
  //goods receipt
  getgoodsreceipt() {
    let array: any[] = [];
    let obj = {
      from_date: this.grfromdate,
      to_date: this.grtodate,
      command: "grn",
    };
    this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
      if(res&&res['status_code']===200){
        this.goodsreceiptdata = res.data;
        console.log(this.goodsreceiptdata);
      }else{
        this.alertcall.showWarning("Alert",res['message'])
      }
    });
  }

  getHeaders2() {
    let headers: string[] = [];
    if(this.goodsreceiptdata) {
      this.goodsreceiptdata.forEach((value:any) => {
        value['Date']=moment(value.Date).format('YYYY-MM-DD');
        value['lr_date']=moment(value.lr_date).format('YYYY-MM-DD');
        value['dmr_date']=moment(value.dmr_date).format('YYYY-MM-DD');
        value['invoice_date']=moment(value.invoice_date).format('YYYY-MM-DD');
        value['purchase_order_date']=moment(value.purchase_order_date).format('YYYY-MM-DD');
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  //goods return
  getgoodsreturn() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.greturnfromdate,
      to_date: this.greturntodate,
      command: "mrn",
    };
    this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
      if(res&&res['status_code']===200){
        this.goodsreturndata=res.message;
        console.log(this.goodsreturndata);
      }else{
        this.alertcall.showWarning("Alert",res['message'])
      }     
    });
  }

  getHeaders4() {
    let headers: string[] = [];
    if(this.goodsreturndata) {
      this.goodsreturndata.forEach((value:any) => {
        value['date']=moment(value.date).format('YYYY-MM-DD');
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  //dmr
  getdmr() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.dmrfromdate,
      to_date: this.dmrtodate,
      command: "dmr",
    };
    this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
      if(res&&res['status_code']===200){
        this.dmrdata=res.data;
        console.log(this.dmrdata);
      }else{
        this.alertcall.showWarning("Alert",res['message'])
      }  
    });
  }
  getHeaders3() {
    let headers: string[] = [];
    if(this.dmrdata) {
      this.dmrdata.forEach((value:any) => {
        value['Date']=moment(value.Date).format('YYYY-MM-DD');
        value['dmr_date']=moment(value.dmr_date).format('YYYY-MM-DD');
        value['invoice_date']=moment(value.invoice_date).format('YYYY-MM-DD');
        value['purchase_order_date']=moment(value.purchase_order_date).format('YYYY-MM-DD');
        value['lr_date']=moment(value.lr_date).format('YYYY-MM-DD');
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  //goods transfer
  getgoodstransfer(){
    let array: any[] = [];
    array.push(this.transferType);
    let obj = {
      from_date: this.gtfromdate,
      to_date: this.gttodate,
      command: "gps",
      transfer_type:array
    };
    this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
      if(res&&res['status_code']===200){
        this.goodstransferdata=res.message;
        console.log(this.goodstransferdata);
      }else{
        this.alertcall.showWarning("Alert",res['message'])
      }     
    });
  }

  //Available stock
  getAvailableStock(){
    this.getAvailableStockdata();
  }
  getAvailableStockdata(){
   
    let obj = {
      command: "stk",
      //  "from_date":this.model.fromdate,
      //  "to_date":this.model.todate,
    };
    this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] === 200) {
         this.avaialablestockdata = res.message;  
        this.dataSource.data = res.message;
        this.totalRecords = res.count;
        this.reaData = false;
        if (res.message.length == 0) {
          this.reaData = true;
        }
     }
    });
  }

  getHeaders5() {
    let headers: string[] = [];
    if(this.avaialablestockdata) {
      this.avaialablestockdata.forEach((value:any) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  //stock statement
  getstockstatement() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.stkstmtfromdate,
      to_date: this.stkstmttodate,
      valuation_type: this.valuationtype,
      command: "sts",
      // material_code:this.materialCODE
    };
    this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
      console.log(res);
      if(res && res["status_code"] === 200){
         this.stockstatementdata=res.message;
         console.log(this.stockstatementdata);
      }
      // this.MatTableExporter.exportTable("xlsx");
    });
  }
  getHeaders6() {
    let headers: string[] = [];
    Object.keys(this.stockstatementdata[0]).forEach((ele:any)=>{
        headers.push(ele)
    })
  //   console.log( headers);
    // let headers: string[] = [];
    // if(this.stockstatementdata) {
    //   // this.stockstatementdata.forEach((value:any) => {
    //     Object.keys(this.stockstatementdata[0]).forEach((key) => {
    //       if(!headers.find((header) => header == key)){
    //         headers.push(key)
    //         console.log(headers);
            
    //       }
    //     })
        
      // })
    // }
     return headers;
  }
  
//material movement history
getmaterialmovdata(){
  this.goodsIssueData = [];
  let obj = {
    from_date: this.mmhfromdate,
    to_date: this.mmhtodate,
    valuation_type: this.valuationtype1,
    command: "mmh",
    material_code:this.selectedmatcode
  };
  this.custservice.getinventoryreports2(obj).subscribe((data: any) => {
  if(data&& data['status_code']===200){
    this.materialmovementdata=data.message
  }
    // console.log(this.goodsIssueData);
    // this.MatTableExporter.exportTable("xlsx");
  });
}


// testing
getmaterialmovdatatest(){
  this.goodsIssueData = [];
  let obj = {
    from_date: this.mmhfromdate,
    to_date: this.mmhtodate,
    valuation_type: this.valuationtype1,
    command: "mmh",
    material_code:this.selectedmatcode
  };
  this.custservice.getinventoryreports2(obj).subscribe((data: any) => {
  if(data&& data['status_code']===200){
    this.materialmovementdatatest=data.message
  }
    // console.log(this.goodsIssueData);
    // this.MatTableExporter.exportTable("xlsx");
  });
}

getHeaders() {
  let headers: string[] = [];
  if(this.materialmovementdatatest) {
    this.materialmovementdatatest.forEach((value:any) => {
      Object.keys(value).forEach((key) => {
        if(!headers.find((header) => header == key)){
          headers.push(key)
          console.log(headers);
          
        }
      })
    })
  }
  return headers;
}


selected(){
  console.log(this.selectematcode);
  
  this.masterData.forEach((element:any) => {
    if(element.system_reference_1==this.selectematcode){
      this.selectedmatcode=element.code
    }
  });

}

//single material stock

saveformdata(){
  this.getSMSdata()
    }
getSMSdata() {
  let obj = {
    material_code: this.selectedmatcode1,
    command: "sms",
  };
  this.custservice.getinventoryreports2(obj).subscribe((res: any) => {
    console.log(res);
    if (res && res["status_code"] == "200") {
      this.smsdata = res.message;
      this.dialog.closeAll();
      this.total = 0;
      this.totalvalue = 0;
      this.smsdata.forEach((el: any) => {
        this.total += el.quantity;
        this.totalvalue += el.value;
        console.log(el.quantity);
      });

    
    } else {
      this.alertcall.showWarning("Warning", res["message"]);
    }
  });
}

selected1(){
  console.log(this.selectematcode1);
  
  this.masterData.forEach((element:any) => {
    if(element.system_reference_1==this.selectematcode1){
      this.selectedmatcode1=element.code,
      this.selectedmatname1=element.name
    }
  });

}

//contractor Name
getContractorDataReports(){
  this.goodsIssueData = [];
  let obj = {
    from_date: this.cstfromdate,
    to_date: this.csttodate,
    command: "cst",
    contractor_name: this.fuelreqcontractor_name || ''
  };
  this.custservice.getContractorData(obj).subscribe((data: any) => {
    console.log(data);
  if(data&& data['status_code']===200){
    this.ContractorDataReports=data.message
    this.ContractorDataReports.forEach((ele:any)=>{
      ele['date']=moment(ele.date).format('YYYY-MM-DD');
    });
  }
  });
}
getHeaders7() {
  let headers: string[] = [];
  Object.keys(this.ContractorDataReports[0]).forEach((ele:any)=>{
        headers.push(ele)
    })
    return headers;

}

//clear form
dmrclearForm() {
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.dmrdata=[];
}
goodsIssueclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.goodsIssueData=[];
}
goodsReceiptclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.goodsreceiptdata=[];
}
goodsReturnclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.goodsreturndata=[];
}
goodsTransferclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.goodstransferdata=[];
}
stockstmtclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  this.stockstatementdata=[];
}

mmhclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  // this.materialmovementdata=[];
  this.mmhData="";
}
cstclearForm(){
  (<HTMLFormElement>document.getElementById("form")).reset();
  // this.ContractorDataReports=[];
  this.testData="";
}
  //xcel for goodsissuedata
  exportExcelgoodsissue(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgoodsissue.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GoodsIssueData${moment().format('DD-MM-YYYY')}.xlsx`);
  }
  //xcel for dmr
    exportExceldmr(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEdmr.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `DailyMaterialReceiptData${moment().format('DD-MM-YYYY')}.xlsx`);  
  }
  //xcel for goods receipt
  exportExcelgoodsreceipt(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgoodsreceipt.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GoodsReceiptData${moment().format('DD-MM-YYYY')}.xlsx`); 
  }
  //xcel for goods return
  exportExcelgoodsreturn(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEGR.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GoodsReturnData${moment().format('DD-MM-YYYY')}.xlsx`); 
  }
  //xcel for goods transfer
    exportExcelgoodstransfer(){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgoodstransfer.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, `GoodsTransferData${moment().format('DD-MM-YYYY')}.xlsx`);
    }
//xcel for mmh
exportExcelmmh(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEmmh.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `MaterialMovementHistoryData${moment().format('DD-MM-YYYY')}.xlsx`); 
}
//xcel for stockstmt
exportExcelstockstmt(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEstockstmt.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `StockStatementData${moment().format('DD-MM-YYYY')}.xlsx`);  
}
//xcel for cst
exportExcelcst(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEcst.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `ContractorData${moment().format('DD-MM-YYYY')}.xlsx`); 
}
exportExcelcst1(){
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEcst1.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  XLSX.writeFile(wb, `ContractorData${moment().format('DD-MM-YYYY')}.xlsx`); 
}
exportexcel(): void{
  let element = document.getElementById('cst_table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `ContractorData${moment().format('DD-MM-YYYY')}.xlsx`);
}

exportexcel1(): void{
  let element = document.getElementById('mmh_table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb,  `MaterialMovementHistoryData${moment().format('DD-MM-YYYY')}.xlsx`);
}
// test
getContractor(){
  let obj = {
    from_date: this.cstfromdate,
    to_date: this.csttodate,
    command: "cst",
    contractor_name: this.fuelreqcontractor_name 
  };
  // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  this.custservice.getContractor(obj).subscribe((data: any) => {
    console.log(data);
     this.testData=data;
     this.testData = this.sanitized.bypassSecurityTrustHtml(data);
  });
}
getmaterialmovdatatest1(){
  let obj = {
    from_date: this.mmhfromdate,
    to_date: this.mmhtodate,
    valuation_type: this.valuationtype1,
    command: "mmh",
    material_code:this.selectedmatcode
  };
  this.custservice.mmhInventoryReports2(obj).subscribe((data: any) => {
    console.log(data);
    this.mmhData=data;
    this.mmhData = this.sanitized.bypassSecurityTrustHtml(data);
  
    // console.log(this.goodsIssueData);
    // this.MatTableExporter.exportTable("xlsx");
  });
  // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  
}


}

