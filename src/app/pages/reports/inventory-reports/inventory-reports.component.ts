import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerService } from "src/app/services/customer.service";
import { MatDialog } from "@angular/material/dialog";
import { AlertCallsService } from "src/app/auth/alert-calls.service";
// import { FormControl } from "@angular/forms";
// import { MatTableExporterModule } from "mat-table-exporter";
import * as XLSX from 'xlsx'; 
import * as moment from "moment";
import { AuthService } from "src/app/auth/auth.service";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";

@Component({
  selector: "app-inventory-reports",
  templateUrl: "./inventory-reports.component.html",
  styleUrls: ["./inventory-reports.component.scss"],
})

export class InventoryReportsComponent implements OnInit {
  @ViewChild('select') select: MatSelect;
  @ViewChild('selectnrgp') selectnrgp: MatSelect;
  @ViewChild('selectdc') selectdc: MatSelect;
  allSelected=false;
  allSelectednrgp=false;
  allSelecteddc=false;
  // toppings = new FormControl();
  displayedColumns: any[] = [
    "sno",
    "mat_code",
    "mat_description",
    // "uom",
    // "storage_location",
    "valuation_type",
    "available_qty",
    "available_value",
    // "unit_price",
  ];
  title = "Goods_Receipt";
  dataForExcel: any[] = [];
  selectedmaterial: any;
  stockstatementdata: any;
  dmrdata: any;
  goodsreturndata: any;
  materialmovementdata: any;
  selectematcode1: any;
  selectedmaterial1: any;
  masterData1: any;
  userdetails: any;
  transferType: any;
  companyData1: any;
  projects: any;

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
  goodstransferdata:any[]=[];
  userData: any[] = [];
  model: any = {};
  companyData: any;
  goodsIssueData: any;
  selectedmatcode: any;
  selectematcode: any;
  masterData: any;
  total: any = 0;
  totalvalue: any = 0;
  smsdata: any;
  fromdate: any[] = [];
  todate: any[] = [];
  companyname: any[] = [];
  status:any[]=['open','closed'];
  companyname1: any[] = [];
  valuationtype: any[] = [];
  data: any[] = [];
  MatTableExporter: any;
  valutiondata: any;
  ogpRGP:any={}
  ogpNRGP:any={}
  dc:any={}
  outGatePassRGPReports:any=[]
  outGatePassNRGPReports:any=[]
  outGatePassdc:any=[]
  // rest: any[];
  constructor(
    public custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
    public authService:AuthService
  ) {}
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef; 
  @ViewChild('TABLEgoodsissue', { static: false }) TABLEgoodsissue: ElementRef;
  @ViewChild('TABLEstockstmt', { static: false }) TABLEstockstmt: ElementRef; 
  @ViewChild('TABLEdmr', { static: false }) TABLEdmr: ElementRef; 
  @ViewChild(' TABLEgoodsreceipt', { static: false })  TABLEgoodsreceipt: ElementRef; 
  @ViewChild('TABLEGR', { static: false }) TABLEGR: ElementRef; 
  @ViewChild('TABLEmmh', { static: false }) TABLEmmh: ElementRef; 
  @ViewChild('TABLEgoodstransfer', { static: false }) TABLEgoodstransfer: ElementRef; 
  @ViewChild('TABLEOutGatePassRGP', { static: false }) TABLEOutGatePassRGP: ElementRef; 
  @ViewChild('TABLEogpNRGP', { static: false }) TABLEogpNRGP: ElementRef; 
  @ViewChild('TABLEDC', { static: false }) TABLEDC: ElementRef;
  ngOnInit(): void {
    this.userdetails = this.authService.currentUserRoleDetails;
    this.projects=this.authService.currentuserProjectDetails;
    // console.log(this.projects); 
    console.log(this.userdetails.app_details.roles[0]);
    // ADMIN
    this.getcompanydata();
    // this.getgoodsissue();
    // this.getstockstatement();
    // this.getgoodsreceipt();
    this.getvalutionData();
    this.getmasterdata()
    this.getcompanydata1();
    // this.getcompanydata();
    // this.clearForm();
  }
  clearForm() {
    (<HTMLFormElement>document.getElementById("form")).reset();
  }
  goodsTransferclearForm(){
    (<HTMLFormElement>document.getElementById("form")).reset();
    this.goodstransferdata=[];
  }
  getcompanydata() {
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
      console.log(this.companyData)
    });
  }
  getcompanydata1() {
    let obj = {
      command: "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData1= res.data;
      console.log(this.companyData)
    });
  }
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
  getgoodsissue() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.fromdate,
      to_date: this.todate,
      company_name: this.companyname,
      // valuation_type: this.valuationtype,
      command: "gin",
    };
    this.custservice.getInventoryReport(obj).subscribe((data: any) => {
      this.goodsIssueData=data.Data
      // console.log(this.goodsIssueData);
      // this.MatTableExporter.exportTable("xlsx");
    });
  }
  getstockstatement() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.fromdate,
      to_date: this.todate,
      company_name: this.companyname,
      valuation_type: this.valuationtype,
      command: "sts",
    };
    this.custservice.getInventoryReport(obj).subscribe((res: any) => {
      this.stockstatementdata=res.message
       console.log(this.goodsIssueData);
      // this.MatTableExporter.exportTable("xlsx");
    });
  }
  getdmr() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.fromdate,
      to_date: this.todate,
      company_name: this.companyname,
      valuation_type: this.valuationtype,
      command: "dmr",
    };
    this.custservice.getInventoryReport(obj).subscribe((data: any) => {
      this.dmrdata=data.message
      // console.log(this.goodsIssueData);
      // this.MatTableExporter.exportTable("xlsx");
    });
  }

  // getgoodsreceipt() {
  //   this.goodsIssueData = [];
  //   let obj = {
  //     from_date: this.fromdate,
  //     to_date: this.todate,
  //     company_name: this.companyname,
  //     valuation_type: this.valuationtype,
  //     command: "grn",
  //   };
  //   this.custservice.getInventoryReport(obj).subscribe((data: any) => {
  //     this.goodsIssueData.push(this.data);

  //     console.log(this.goodsIssueData);
  //     // this.MatTableExporter.exportTable("xlsx");
  //   });
  // }

  getgoodsreturn() {
    this.goodsIssueData = [];
    let obj = {
      from_date: this.fromdate,
      to_date: this.todate,
      company_name: this.companyname,
      valuation_type: this.valuationtype,
      command: "mrn",
    };
    this.custservice.getInventoryReport(obj).subscribe((data: any) => {
      this.goodsreturndata=data.message
      // console.log(this.goodsIssueData);
      // this.MatTableExporter.exportTable("xlsx");
    });
  }

  getgoodsreceipt() {
    let array: any[] = [];
    array.push(this.companyname);
    let obj = {
      from_date: this.fromdate,
      to_date: this.todate,
      company_name: this.companyname,
      // company_name: array,
      //     valuation_type: this.valuationtype,
      command: "grn",
    };
    this.custservice.getInventoryReport(obj).subscribe((res: any) => {
      // if (res && res["status_code"] == "200") {
      this.avaialablestockdata = res.message;
      // this.dataa = res.data;
      // this.userData.push(this.dataa[0]);
      this.userData.push(this.avaialablestockdata);
      // this.dataSource.data = res.message;
      console.log(this.avaialablestockdata);
      console.log(this.userData);
      // this.totalRecords = res.count;
      // this.reaData = false;
      // if (res.message.length == 0) {
      // this.reaData = true;
      // }
      // }
    });
  }
  getAvailablestock() {
    console.log(this.model);
    this.getdata();
  }
  getdata() {
    let array: any[] = [];
    array.push(this.model.companyname);
    let obj = {
      command: "stk",
      //  "from_date":this.model.fromdate,
      //  "to_date":this.model.todate,
      company_name: array,
    };
    this.custservice.getavailablestockdata(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
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
  // getgoodsreturn(){}

  closemodel() {
    this.dialog.closeAll();
  }
  selectedmastergroup() {
    console.log(this.selectematcode);
    this.masterData.forEach((el: any) => {
      if (this.selectematcode == el.system_reference_1) {
        this.selectedmatcode = el.code;
      }
    });
  }
  getmaterialDATA(ev:any){
    this.selectedmaterial=ev.target.value
    if(this.selectedmaterial.length>2){
this.getmasterdata()
    }
    if(!this.selectedmaterial){
      this.getmasterdata()
    }
  }
  getmasterdata(){
    let obj={
      "command":'lst',
      "lmt":100,
      "pid":1,
      "key":this.selectedmaterial
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.masterData=res.data
      
    })
  }
  saveformdata(){
    this.getSMSdata()
      }
  getSMSdata() {
    let obj = {
      material_code: this.selectedmatcode,
      command: "sms",
    };
    this.custservice.getsmsdata(obj).subscribe((res: any) => {
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

        // var duplicates =  this.smsdata.reduce(function(acc:any, el:any, i:any, arr:any) {
        //   if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        // }, []);

        // document.write(duplicates);
        // unique = [...new Set(this.smsdata.map((ele:any) => ele.company_name))];
        // if (unique.length === 1) {
        // console.log(unique);
        // }
        // this.smsdata.forEach((element:any) => {
        // this.invoice_number:any[]=[]
        // this.companyname.push(element.company_name)
        // this.invoice_date.push(element.invoice_date)
        // this.deliverychallanno.push(element.dc_number)
        //  this.duplicate_cmpnynme= [...new Set( this.smsdata)];

        //  if(this.duplicate_cmpnynme){
        //    let strgarray:any=[]
        //    this.duplicate_cmpnynme.forEach((ele:any)=>{
        //     strgarray.push(ele.storage_location)
        //    })
        //    console.log(strgarray);

        //  }
        // })
      } else {
        this.alertcall.showWarning("Warning", res["message"]);
      }
    });
  }
  addsms(data: any) {
    this.dialog.open(data, {
      width: "650px",
    });
  }
  getmaterialmovdata(){
    this.goodsIssueData = [];
    let obj = {
      from_date: this.fromdate,
      to_date: this.todate,
      company_name: this.companyname,
      valuation_type: this.valuationtype,
      command: "mmh",
      material_code:this.selectedmatcode
    };
    this.custservice.getInventoryReport(obj).subscribe((data: any) => {
      this.materialmovementdata=data.message
      // console.log(this.goodsIssueData);
      // this.MatTableExporter.exportTable("xlsx");
    });
  }
  selected(){
    console.log(this.selectematcode1);
    
    this.masterData.forEach((element:any) => {
      if(element.system_reference_1==this.selectematcode1){
        this.selectedmatcode=element.code
      }
    });
  
  }

    //goods transfer
    getgoodstransfer(){
      let array: any[] = [];
      array.push(this.transferType);
      let obj = {
        from_date: this.fromdate,
        to_date: this.todate,
        command: "gps",
        transfer_type:array,
        company_name: this.companyname1,
      };
      this.custservice.getInventoryReport(obj).subscribe((res: any) => {
        if(res&&res['status_code']===200){
          this.goodstransferdata=res.message;
          console.log(this.goodstransferdata);
        }else{
          this.alertcall.showWarning("Alert",res['message'])
        }     
      });
    }
  exportExcelpotNum(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `AvailableStockData_${moment().format('L')}.xlsx`);
  }
  exportExcelgoodsissue(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgoodsissue.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GoodsIssueData${moment().format('L')}.xlsx`);
  }
  exportExcelstockstmt(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEstockstmt.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `StockStatementData${moment().format('L')}.xlsx`);  
  }
  exportExceldmr(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEdmr.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `DailyMaterialReceiptData${moment().format('L')}.xlsx`);  
  }
  exportExcelgoodsreceipt(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgoodsreceipt.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GoodsReceiptData${moment().format('L')}.xlsx`); 
  }
  exportExcelgoodsreturn(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEGR.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `GoodsReturnData${moment().format('L')}.xlsx`); 
  }
  exportExcelmmh(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEmmh.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, `MaterialMovementHistoryData${moment().format('L')}.xlsx`); 
  }
    //xcel for goods transfer
    exportExcelgoodstransfer(){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEgoodstransfer.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, `GoodsTransferData${moment().format('L')}.xlsx`);
    }
    getogprgp(){
      let obj={
   "command":"view",
   "from_date":this.ogpRGP.fromdate,
   "to_date":this.ogpRGP.todate,
   "company_name":this.ogpRGP.companyname,
   "status":this.ogpRGP.status
      }
      this.custservice.getOutGatePassRGPReports(obj).subscribe((res:any)=>{
       if(res&&res['status_code']===200){
        this.outGatePassRGPReports=res.Data
       }
      })
    }
    getHeaders() {
      let headers: string[] = [];
      if(this.outGatePassRGPReports) {
        this.outGatePassRGPReports.forEach((value:any) => {
          // value['Date']=moment(value.Date).format('YYYY-MM-DD');
          // if(value['Lr_Date']!==null){
          //   value['Lr_Date']=moment(value.Lr_Date).format('YYYY-MM-DD');
          // }if(value['Expected_Return_Date']!==null){
          //   value['Expected_Return_Date']=moment(value.Expected_Return_Date).format('YYYY-MM-DD');
          // }if(value['Gate_Outward_Date']!==null){
          //   value['Gate_Outward_Date']=moment(value.Gate_Outward_Date).format('YYYY-MM-DD');
          // }
          if(value['Unit_Price']!==null){
            value['Unit_Price']=parseFloat(value.Unit_Price).toFixed(2)
          }if(value['Total_Price']!==null){
            value['Total_Price']=parseFloat(value.Total_Price).toFixed(2)
          }
          Object.keys(value).forEach((key) => {
            if(!headers.find((header) => header == key)){
              headers.push(key)
            }
          })
        })
      }
      return headers;
    }
    ogprgpclearForm(){
      (<HTMLFormElement>document.getElementById("ogpRGPform")).reset();
      this.outGatePassRGPReports=[]
    }
    exportExcelogprgp(){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEOutGatePassRGP.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, `OutGatePassRGPData${moment().format('L')}.xlsx`); 
    }
    getogpnrgp(){
      let obj={
        "command":"view",
        "from_date":this.ogpNRGP.fromdate,
        "to_date":this.ogpNRGP.todate,
        "company_name":this.ogpNRGP.companyname
           }
           this.custservice.getOgpNRGPReports(obj).subscribe((res:any)=>{
            if(res&&res['status_code']===200){
             this.outGatePassNRGPReports=res.Data
            }
           })
    }
    getHeadersNRGP() {
      let headers: string[] = [];
      if(this.outGatePassNRGPReports) {
        this.outGatePassNRGPReports.forEach((value:any) => {
          // value['Date']=moment(value.Date).format('YYYY-MM-DD');
          // if(value['Lr_Date']!==null){
          //   value['Lr_Date']=moment(value.Lr_Date).format('YYYY-MM-DD');
          // }
          // if(value['Expected_Return_Date']!==null){
          //   value['Expected_Return_Date']=moment(value.Expected_Return_Date).format('YYYY-MM-DD');
          // }
          // if(value['Gate_Outward_Date']!==null){
          //   value['Gate_Outward_Date']=moment(value.Gate_Outward_Date).format('YYYY-MM-DD');
          // }
          if(value['Unit_Price']!==null){
            value['Unit_Price']=parseFloat(value.Unit_Price).toFixed(2)
          }if(value['Total_Price']!==null){
            value['Total_Price']=parseFloat(value.Total_Price).toFixed(2)
          }
          Object.keys(value).forEach((key) => {
            if(!headers.find((header) => header == key)){
              headers.push(key)
            }
          })
        })
      }
      return headers;
    }
    ogpnrgpclearForm(){
      (<HTMLFormElement>document.getElementById("ogpNRGPform")).reset();
      this.outGatePassNRGPReports=[]
    }
    exportExcelogpnrgp(){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEogpNRGP.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, `OutGatePassNRGPData${moment().format('L')}.xlsx`); 
    }


    //Delvery Challan
    getdc(){
      let obj={
        "command":"view",
        "from_date":this.dc.fromdate,
        "to_date":this.dc.todate,
        "company_name":this.dc.companyname
           }
           this.custservice.getDCData(obj).subscribe((res:any)=>{
            if(res&&res['status_code']===200){
             this.outGatePassdc=res.Data
            }
           })
    }
    getHeadersdc() {
      let headers: string[] = [];
      if(this.outGatePassdc) {
        this.outGatePassdc.forEach((value:any) => {
          // value['Date']=moment(value.Date).format('YYYY-MM-DD');
          // if(value['Lr_Date']!==null){
          //   value['Lr_Date']=moment(value.Lr_Date).format('YYYY-MM-DD');
          // }
          // if(value['Expected_Return_Date']!==null){
          //   value['Expected_Return_Date']=moment(value.Expected_Return_Date).format('YYYY-MM-DD');
          // }
         
          if(value['Unit_Price']!==null){
            value['Unit_Price']=parseFloat(value.Unit_Price).toFixed(2)
          }if(value['Total_Price']!==null){
            value['Total_Price']=parseFloat(value.Total_Price).toFixed(2)
          }
          Object.keys(value).forEach((key) => {
            if(!headers.find((header) => header == key)){
              headers.push(key)
            }
          })
        })
      }
      return headers;
    }
    dcclearForm(){
      (<HTMLFormElement>document.getElementById("dcform")).reset();
      this.outGatePassdc=[]
    }
    exportExceldc(){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLEDC.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, `DCData${moment().format('L')}.xlsx`); 
    }
    //end
    statusData(event:any){
      this.status.push(event.target.value)
      // if(event.target.value == "close" ){
      //   this.status =[]
      //   this.status.push("close");
      // }
      // if(event.target.value == "open" ){
      //   this.status =[]
      //   this.status.push("open");
      // }
      console.log(this.status);
      
    }

    //rgp select all
    toggleAllSelection() {
      if (this.allSelected) {
        this.select.options.forEach((item: MatOption) => item.select());
      } else {
        this.select.options.forEach((item: MatOption) => item.deselect());
      }
    }
     optionClick() {
      let newStatus = true;
      this.select.options.forEach((item: MatOption) => {
        if (!item.selected) {
          newStatus = false;
        }
      });
      this.allSelected = newStatus;
    }

    //nrgp select all
    toggleAllSelectionnrgp() {
      if (this.allSelectednrgp) {
        // alert(1)
        this.selectnrgp.options.forEach((item: MatOption) => item.select());
      } else {
        this.selectnrgp.options.forEach((item: MatOption) => item.deselect());
      }
    }
     optionClicknrgp() {
      let newStatusnrgp = true;
      this.selectnrgp.options.forEach((item: MatOption) => {
        // alert(1)
        if (!item.selected) {
          newStatusnrgp = false;
        }
      });
      this.allSelectednrgp = newStatusnrgp;
    }
    //delevery challan select all
    toggleAllSelectiondc() {
      if (this.allSelecteddc) {
        this.selectdc.options.forEach((item: MatOption) => item.select());
      } else {
        this.selectdc.options.forEach((item: MatOption) => item.deselect());
      }
    }
     optionClickdc() {
      let newStatusdc = true;
      this.selectdc.options.forEach((item: MatOption) => {
        if (!item.selected) {
          newStatusdc = false;
        }
      });
      this.allSelecteddc = newStatusdc;
    }

}
