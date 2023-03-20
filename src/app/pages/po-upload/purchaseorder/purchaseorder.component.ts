import { Component, Injector, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { I, T } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: "app-purchaseorder",
  templateUrl: "./purchaseorder.component.html",
  styleUrls: ["./purchaseorder.component.scss"],
})
export class PurchaseorderComponent implements OnInit {
  activitylogcolumns :any[]=[
    "sno",
    "username",
    "created_date",
    "reference_number",
    "description",
    "remarks",
    // "reason",
    "action",
  ];
  reaDatalog: boolean;
  totalRecordslog: any;
  dataSourcemainlog = new MatTableDataSource();
  displayedColumns: any[] = [
    "sno",
    "pr_number",
    "pr_date",
    "material_code",
    "material_description",
    "unit_of_measurement",
    "quantity",
    "unit_price",
    "basic_price",
    "tax_description",
    "tax_percent",
    "tax_value",
    "total_price",
    "item_remarks",
    "action",
  ];
  displayedColumns1: any[] = [
    "sno",
    "PO_number",
    "Date",
    "company_Name",
    "vendor_name",

    "action",
  ];
  model: any = {};
  model1: any = {};
  model2: any = {};
  editmodel: any = {};
  saveddataarray: any[] = [];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  valuefrminv: any = 0;
  valuefrmrec: any = 0;
  unitValue: any = 0;
  discValue: any = 0;
  taxPercent: any = 0;
  masterData: any;
  taxData: any;
  companyData: any;
  vendorData: any;
  transporterName: any;
  vehicleNum: any;
  basicFreight: any = 0;
  freightPercentage: any = 0;
  freightPercentage1: any = 0;
  storageData: any;
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  PRNumber: any[] = [];
  PRDate: any[] = [];
  UnitPRICE: any[] = [];
  qty: any[] = [];
  itemremarks: any[] = [];
  BASICprice: any[] = [];
  TAXDescription: any[] = [];
  TAXPercentage: any[] = [];
  TAXValue: any[] = [];
  TotalPRICE: any[] = [];

  SNO: any[] = [];

  addedTableData: any = true;
  savedTableData: any = false;
  totalRecords: any = 0;
  reaData: boolean;
  loadingRecords: any = false;
  pageIndex: any = 1;
  pageSize: any = 10;
  deleteNumber: any;
  deletemodel: any = {}
  model2matcode: any;
  model2matdes: any;
  valuefrminvedit: any = 0;
  valuefrmrecedit: any = 0;
  unitValueedit: any = 0;
  discValueedit: any = 0;
  editedtaxdescription: any;
  selectedIndex: number;
  SUM: any = 0;
  editabledata: any;
  editDATAA: any = false;
  materialCODE: any;
  materialNAME: any;
  systemref: any;
  NUMBER: any;
  basicFreight1: any = 0;
  selectedtransporter: any;
  selectedvehiclenum: any;
  selectedvehiclenum1: any;
  selectedtransporter1: any;
  selectedmaterial: any;
  selectedstorage: any;
  selectedstorage1: any;
  selectedmaterial1: any;
  valutiondata: any;
  contracordata: boolean;
  PRData: any;
  selectedprvalue: any;
  PURCHASEdata: any[] = []
  PURCHASEdata1: any[] = []
  PURCHASEdata12: any[] = []
  demo1TabIndex: any = 0;
  address1: any;
  serialnumberdata: any[] = []
  prnumberarray: any[] = []
  prvalue: any;
  showbtn: any = false;
  dialogRef: any = null;
  purchaseordernumber: any;
  filedata: any;
  createNewFile: any = {}
  createNewFile1: any = {}
  imageUrl = environment.base_url
  deleteid: any;
  fileUploadUrls: any[] = []
  filedata1: any;
  fileUploadUrls1: any;
  prvaluenum: any;
  purchaserequestnumber: any;
  fileUploadUrlspo: any[] = []
  fileurls: any[] = []
  createNewFilepo: any = {}
  PURCHASEORDERNO: any;
  filenamearray: any[] = []
  filenamearray1: any[] = []
  selectedfiles: any[] = []
  editednumber: any;
  editModel: any = {}
  editdataa: any;
  btn: any = "Save"
  logdata: any;
  selectedvendor: any;
  documnet_nodata: any;
  constructor(private dialog: MatDialog, private custservice: CustomerService,
    private snackbar: MatSnackBar, public overlay: Overlay,
    private alertcall: AlertCallsService, public router: Router,
    private route: ActivatedRoute, private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.model1.dateee = moment(new Date()).format("YYYY-MM-DD")
    this.demo1TabIndex = 0;
    this.route.queryParams.subscribe((params: any) => {

      if (params.tab == 'notificationsissue') {
        this.demo1TabIndex = 1;
        console.log(params);

      }
      else {
        this.demo1TabIndex = 0;
      }
    })
    // this.getprdata()
    // this.getmasterdata()
    this.getTaxlistdata();
    this.getcompanydata()
    // this.getvendordata()
    // this.getTransporterdata()
    // this.getvehiclenumdata()
    // this.getstoragelocData()
    this.getData()
    // this.getvalutionData()
    this.getContractdata()
    this.getvendordata()
    this.getpurchasereqdata()
    this.getlogdata()
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "PurchaseOrder"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      console.log(res);
      this.logdata = res.log;
      this.reaDatalog = false;
    this.totalRecordslog = res?.count;
    this.dataSourcemainlog = res.log;
    console.log(this.dataSourcemainlog);
    if (res.log.length == 0) {
      this.reaDatalog = true;
    }
    })
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.purchaseordernumber = row1.number
    this.getexistingfiles()
  }
  openfileuploadmodel1(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.purchaserequestnumber = row1.number
    this.getexistingfilespr()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.purchaseordernumber,)
      .set("document_type", "Purchase Order")
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata = res.data
        this.createNewFile.fileName = ''
        this.fileUploadUrls = []
      } else {
        this.filedata = ''
        console.log(this.filedata);
      }
    })
  }
  getexistingfilespr() {
    console.log(this.prvaluenum);
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.purchaserequestnumber)
      .set("document_type", "Purchase Request")
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata1 = res.data
        this.createNewFile1.fileName = ''
      } else {
        this.filedata1 = ''
        console.log(this.filedata);
      }
    })
  }
  viewDoc(file: any) {
    const url = this.imageUrl + '/' + file.file_path;
    window.open(url, '_blank');
  }
  deleterowfile(row: any, data: any) {
    this.deleteid = data.id
    this.dialogRef = this.dialog.open(row, {
      width: "400px"
    })
  }
  deleteexistingfile() {
    let params = new HttpParams()
    params = new HttpParams()
      .set("document_number", this.purchaseordernumber,)
      .set("document_type", "Purchase Order")
      .set("id", this.deleteid)
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully")
        this.getexistingfiles()
        this.dialogRef.close()
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploadWbsFile(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrls = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrls) {
        this.filenamearray.push(file.name)

      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Purchase Order");
    postData.append("document_number", this.purchaseordernumber);
    for (const file of this.fileUploadUrls) {
      postData.append('doc', file);
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.filenamearray = []
        this.fileUploadUrls = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploadpofiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlspo = fileInput.target.files;
      this.fileurls = fileInput.target.files;
      for (const file of this.fileUploadUrlspo) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }
    }
    console.log(this.fileUploadUrlspo);
    //  this.uploadingselectedfiles()
  }
  getvendordropdowndata(ev:any){
    this.selectedvendor=ev.target.value
    if( this.selectedvendor.length>2){
this.getvendordata()
    }
    if(! this.selectedvendor){
      this.getvendordata()
    }
  }
  getvendordata() {
    let obj = {
      "command": "lst",
      "lmt":100000,
      "key":this.selectedvendor||""
    }
    this.custservice.getvendormasterdata(obj).subscribe((res: any) => {
      this.vendorData = res.data
    })
  }
  getcompanydata() {
    let obj = {
      "command": "lst",
      lmt:100000,
      pid:1
    }
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData = res.data

    })
  }
  getContractdata() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex,
      "key": ""
    }
    this.custservice.getcontractormasterdata(obj).subscribe((res: any) => {
      this.contracordata = res.data;
      //  this.totalRecords = res?.count;
      //  this.dataSource.data = res.data
      //  if(res.data.length==0){
      //   this.contracordata = true
      // }
    })
  }
  //     deleterow(index:any){
  //       console.log(index);

  //       this.saveddataarray.splice(index, 1);
  //       this.dataSource.data=this.saveddataarray
  //       console.log(this.dataSource.data)
  //     }

  //     onpageevent(event:any){
  //       this.pageIndex=event.pageIndex+1;
  //       this.pageSize= event.pageSize;
  //       this.getData()
  //     }
  //     deleteItem(rw:any,data:any){

  //   this.dialog.open(data,{
  //     width:'400px',
  //     // scrollStrategy: new NoopScrollStrategy()
  //   })
  //   this.deleteNumber=rw.number
  //     }

  //     deleteFile(){
  //   let obj={
  //     "command" : "del", 
  //     "number" : this.deleteNumber
  //   }
  //   this.custservice.deletepurchaseorderdata(obj).subscribe((res:any)=>{
  //     if(res&&res['status_code']=="200"){
  //       this.alertcall.showSuccess('Accepted', res['message']);

  //       this.dialog.closeAll()
  //       this.getData()
  //          }else{
  //           this.alertcall.showSuccess('Accepted', res['message']);
  //          }
  //   })
  //     }
  //     getData(){
  //       let obj={
  //         "command":"lst",
  //         "lmt" : this.pageSize,
  //         "pid" : this.pageIndex,
  //         "key" : ""
  //       }
  //   this.custservice.getpurchaseorderdata(obj).subscribe((res:any)=>{
  //     console.log(res);
  //     this.reaData=false;
  //     this.totalRecords = res?.count;
  //     this.dataSourcemain.data = res.data
  //     if(res.data.length==0){
  //      this.reaData = true
  //    }

  //   })
  //     }
  //     getPurchasereqDATA(ev:any){
  //       console.log(ev.target.value);
  //       this.selectedprvalue=ev.target.value
  //       if(this.selectedprvalue.length>2){
  //   this.getpurchasereqdata()
  //       }
  //       if(! this.selectedprvalue){
  //         this.getpurchasereqdata()
  //       }
  //     }
  //   getpurchasereqdata(){
  //     let obj={
  //       "command":"prq",
  //       // "command":"lst",
  //       // "lmt" : 1000000,
  //       // "pid" : 1,
  //       "key" : this.selectedprvalue
  //     }
  // this.custservice.getpurchaserequestdata(obj).subscribe((res:any)=>{
  //   console.log(res);
  //   this.PRData=res.data
  // })
  //   }
  deleterow(index: any) {
    console.log(index);

    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }
  deleteItem(rw: any, data: any) {
    this.dialog.open(data, {
      width: "400px",
      // scrollStrategy: new NoopScrollStrategy()
    });
    this.deleteNumber = rw.number;
  }

  deleteFile() {
    let obj = {
      command: "del",
      number: this.deleteNumber,
      reason: this.deletemodel.reason
    };
    this.custservice.deletepurchaseorderdata(obj).subscribe((res: any) => {
      if (res && res["status_code"] == "200") {
        this.alertcall.showSuccess("Accepted", res["message"]);

        this.dialog.closeAll();
        this.deletemodel.reason = ""
        this.getData();
        this.getlogdata()
      } else {
        this.alertcall.showSuccess("Accepted", res["message"]);
      }
    });
  }
  getData() {
    let obj = {
      command: "lst",
      lmt: this.pageSize,
      pid: this.pageIndex,
      key: "",
    };
    this.custservice.getpurchaseorderdata(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data;
      if (res.data.length == 0) {
        this.reaData = true;
      }
    });
  }
  getPurchasereqDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedprvalue = ev.target.value;
    if (this.selectedprvalue.length > 2) {
      this.getpurchasereqdata();
    }
    if (!this.selectedprvalue) {
      this.getpurchasereqdata();
    }
  }
  getpurchasereqdata() {
    let obj = {
      "command": "prq",
      // "command":"lst",
      // "lmt" : 1000000,
      // "pid" : 1,
      "key": this.selectedprvalue
    }
    this.custservice.getpurchaserequestdata(obj).subscribe((res: any) => {
      console.log(res);
      this.PRData = res.data
    })
  }
  selectedprVALUE() {
    // this.showbtn = false;
    this.prvalue = this.model.prnumber

    //  console.log(this.prnumberarray);
  }
  getstorageDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage = ev.target.value;
    if (this.selectedstorage.length > 2) {
      this.getstoragelocData();
    }
  }
  getstorageDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage1 = ev.target.value;
    if (this.selectedstorage1.length > 2) {
      this.getstoragelocData();
    }
  }
  getstoragelocData() {
    let obj = {
      command: "mat",
      field: "storage_location",
      key: this.selectedstorage || this.selectedstorage1,
    };
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data;
    });
  }
  getvehiclenumDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedvehiclenum = ev.target.value;
    if (this.selectedvehiclenum.length > 2) {
      this.getvehiclenumdata();
    }
  }
  getvehiclenumDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedvehiclenum1 = ev.target.value;
    if (this.selectedvehiclenum1.length > 2) {
      this.getvehiclenumdata();
    }
  }
  getvehiclenumdata() {
    let obj = {
      command: "mat",
      field: "vehicle_number",
      key: this.selectedvehiclenum || this.selectedvehiclenum1,
    };
    this.custservice.getmatvehiclenumdata(obj).subscribe((res: any) => {
      this.vehicleNum = res.data;
    });
  }
  gettransportDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedtransporter = ev.target.value;
    if (this.selectedtransporter.length > 2) {
      this.getTransporterdata();
    }
    if (!this.selectedtransporter) {
      this.getTransporterdata();
    }
  }
  gettransportDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedtransporter1 = ev.target.value;
    if (this.selectedtransporter1.length > 2) {
      this.getTransporterdata();
    }
    if (!this.selectedtransporter1) {
      this.getTransporterdata();
    }
  }
  getTransporterdata() {

    let obj = {
      "command": "mat",
      "field": "transporter_name",
      "key": this.selectedtransporter || this.selectedtransporter1,

    }
    this.custservice.getmattransnamedata(obj).subscribe((res: any) => {
      this.transporterName = res.data
    })
  }
  selectedtaxedit() {


    this.taxData.forEach((el: any) => {
      this.PURCHASEdata12.forEach((ele: any) => {
        console.log('hello');

        if (el.code == ele.tax_description) {
          ele.tax_percent = el.percentage
          ele.tax_value = (ele.basic_price * ele.tax_percent * 0.01).toFixed(2);
          ele.total_price = Number(ele.basic_price) + Number(ele.tax_value)
          console.log(ele.tax_percent);
          // this.editedtaxdescription=el.percentage
        }
      })

    })
    //   this.model2.taxpercentage= this.editedtaxdescription
    // //  this.taxPERCENTAGE=
    //    if(this.model2.taxpercentage){
    //     this.model2.taxvalue=this.model2.basicprice*this.model2.taxpercentage*0.01
    //     this.model2.totalprice=this.model2.basicprice+this.model2.taxvalue
    //   }


  }
  // selectedmastergroup(){
  //   console.log(this.model.matcode);
  //   this.masterData.forEach((ele:any) => {
  //     if(ele.system_reference_1==this.model.matcode){
  //       this.model.uom=ele.uom_1
  //       this.materialCODE=ele.code
  //       this.materialNAME=ele.name
  //     }
  //   });


  // }
  keyPress() {
    this.getpurchasereqdata()
  }
  addpurchaseorder(data: any) {
    this.dialog.open(data, {
      width: '600px',
      // scrollStrategy: this.overlay.scrollStrategies.noop()
      //  scrollStrategy: new NoopScrollStrategy()
    })

    this.model.prnumber = null

  }

  getmaterialDATA1(ev: any) {
    this.selectedmaterial1 = ev.target.value;
    if (this.selectedmaterial1.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial1) {
      this.getmasterdata();
    }
  }
  getmasterdata() {
    let obj = {
      command: "lst",
      lmt: 100000,
      pid: 1,
      key: this.selectedmaterial || this.selectedmaterial1,
    };
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data;
    });
  }
  getTaxlistdata() {
    let obj = {
      command: "lst",
    };
    this.custservice.gettaxlistdata(obj).subscribe((res: any) => {
      this.taxData = res.data;
    });
  }
  selectedmastergroup() {
    console.log(this.model.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.model.matcode) {
        this.model.uom = ele.uom_1;
        this.materialCODE = ele.code;
        this.materialNAME = ele.name;
      }
    });
  }

  // addpurchaseorder(data: any) {
  //   this.dialog.open(data, {
  //     width: "600px",
  //     // scrollStrategy: this.overlay.scrollStrategies.noop()
  //     //  scrollStrategy: new NoopScrollStrategy()
  //   });
  // }

  closemodel() {
    this.dialog.closeAll();
  }
  saveaddeddata(form: any) {
    this.showbtn = false;
    if (this.prnumberarray.length == 0) {
      this.getprdata();

      this.model = {};
      this.dialog.closeAll();
    } else {

      this.prnumberarray.forEach((ele: any) => {
        if (ele == this.prvalue) {
          this.showbtn = true;
          this.alertcall.showWarning("Error", "PR Number already added")
        }
      })
      if (!this.showbtn) {
        this.getprdata();

        this.model = {};
        this.dialog.closeAll();

      }
    }
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
  getprdata() {
    let obj = {
      command: "set",
      pr_number: [this.model.prnumber],
    };
    this.custservice.setpurchaseorderdata(obj).subscribe((res: any) => {
      let PURCHASEdata1: any[] = [];
      PURCHASEdata1 = res.data;
      PURCHASEdata1.forEach((element: any) => {
        element["unit_price"] = "";
        element["basic_price"] = "";
        element["tax_description"] = "";
        element["tax_percent"] = "";
        element["tax_value"] = "";
        element["total_price"] = "";
        element["item_remarks"] = "";
        this.serialnumberdata.push(element.line_item)
      });

      PURCHASEdata1.forEach((ele: any) => {
        // ele.forEach((element:any) => {
        this.PURCHASEdata12.push(ele);
        // });
        //  this.PURCHASEdata12.concat(ele)
      });

      this.prnumberarray.push(this.prvalue)
      console.log(this.prnumberarray);
      this.prvaluenum = this.model.prnumber
      //  this.PURCHASEdata12=PURCHASEdata1
      //  console.log(this.PURCHASEdata12);
    });
  }
  deleterowItem(index: any) {
    // this.PURCHASEdata1.forEach((ele:any)=>{

    // })
    this.PURCHASEdata12.splice(index, 1);
  }
  selectedunitprice(ev: any, data: any) {
    console.log(data);
    data.basic_price = data.quantity * ev.target.value;
    data.tax_value = data.basic_price * data.tax_percent * 0.01;
    data.total_price = data.basic_price + data.tax_value;
  }
  selectedtaxpercentage(ev: any, data: any) {
    data.tax_value = data.basic_price * data.tax_percent * 0.01;
    data.total_price = data.basic_price + data.tax_value;
  }
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      this.serialnumberdata.forEach((element: any) => {
        this.SNO.push(element)
      });
      this.PURCHASEdata12.forEach((ele: any, index: any) => {
        // this.SNO.push(index + 1);
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.unit_of_measurment);
        this.PRNumber.push(ele.number);
        this.PRDate.push(moment(ele.date).format("YYYY-MM-DD"));
        this.qty.push(Number(ele.quantity));
        this.itemremarks.push(ele.item_remarks);
        this.UnitPRICE.push(ele.unit_price);
        this.BASICprice.push(ele.basic_price);
        this.TAXDescription.push(ele.tax_description);
        this.TAXPercentage.push(Number(ele.tax_percent));
        this.TAXValue.push(Number(ele.tax_value));
        this.TotalPRICE.push(Number(ele.total_price));
      });

      let obj = {
        company_name: this.model1.companyname,
        comments: this.model1.comments,
        vendor_name: this.model1.vendorname,
        subject: this.model1.subject,
        vendor_reference: this.model1.vendorref,
        price_basis: this.model1.pricebasis,
        other_tax_description: this.model1.otaxdesc,
        other_tax_percent: this.model1.otaxperc,
        other_tax_value: this.model1.otaxvalue,
        freight: this.model1.freight,
        transist_insurance: this.model1.tinsurance,
        packing_forwarding: this.model1.packingforward,
        quantity_tolerance: this.model1.qtytolerance,
        delivery_time: this.model1.deltime,
        shipping_address: this.model1.shippingadd,
        billing_address: this.model1.billingadd,
        payment_terms: this.model1.paymentterms,
        unloading_scope: this.model1.unloadingscope,
        mode_of_payment: this.model1.paymentmode,
        enclosures: this.model1.enclosers,
        company_gst_number: this.model1.companygst,
        vendor_gst_number: this.model1.vendorgst,

        pr_number: this.PRNumber,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        quantity: this.qty,
        unit_price: this.UnitPRICE,
        tax_description: this.TAXDescription,
        tax_percent: this.TAXPercentage,
        // "tax_value":this.TAXValue,
        item_remarks: this.itemremarks,
        // "basic_price":this.BASICprice,
        // "total_price":this.TotalPRICE,
        command: "add",
      };
      this.custservice.addpurchaseorderdata(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.PURCHASEdata12 = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.UnitPRICE = [];
          this.BASICprice = [];
          this.itemremarks = [];
          this.TAXDescription = [];
          this.TAXPercentage = [];
          this.TAXValue = [];
          this.TotalPRICE = [];
          this.PRNumber = [];
          this.PRDate = [];
          this.serialnumberdata = []
          this.prnumberarray = []
          this.getData();
          this.getlogdata()
          this.PURCHASEORDERNO = res['reference']
          if (this.fileUploadUrlspo.length > 0) {
            this.uploadingselectedfiles()
          }

        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.UnitPRICE = [];
          this.BASICprice = [];
          this.itemremarks = [];
          this.TAXDescription = [];
          this.TAXPercentage = [];
          this.TAXValue = [];
          this.TotalPRICE = [];
          this.PRNumber = [];
          this.PRDate = [];
          // this.serialnumberdata=[]
        }
      });
    } else {
      this.serialnumberdata.forEach((element: any) => {
        this.SNO.push(element)
      });
      this.PURCHASEdata12.forEach((ele: any, index: any) => {
        this.matCode.push(ele.material_code);
        this.matName.push(ele.material_description);
        this.UOM.push(ele.unit_of_measurment);
        this.PRNumber.push(ele.number);
        this.PRDate.push(moment(ele.date).format("YYYY-MM-DD"));
        this.qty.push(Number(ele.quantity));
        this.itemremarks.push(ele.item_remarks);
        this.UnitPRICE.push(ele.unit_price);
        this.BASICprice.push(ele.basic_price);
        this.TAXDescription.push(ele.tax_description);
        this.TAXPercentage.push(Number(ele.tax_percent));
        this.TAXValue.push(Number(ele.tax_value));
        this.TotalPRICE.push(Number(ele.total_price));
      });

      let obj = {
        reason: this.editModel.reason,
        company_name: this.model1.companyname,
        comments: this.model1.comments,
        vendor_name: this.model1.vendorname,
        subject: this.model1.subject,
        vendor_reference: this.model1.vendorref,
        price_basis: this.model1.pricebasis,
        other_tax_description: this.model1.otaxdesc,
        other_tax_percent: this.model1.otaxperc,
        other_tax_value: this.model1.otaxvalue,
        freight: this.model1.freight,
        transist_insurance: this.model1.tinsurance,
        packing_forwarding: this.model1.packingforward,
        quantity_tolerance: this.model1.qtytolerance,
        delivery_time: this.model1.deltime,
        shipping_address: this.model1.shippingadd,
        billing_address: this.model1.billingadd,
        payment_terms: this.model1.paymentterms,
        unloading_scope: this.model1.unloadingscope,
        mode_of_payment: this.model1.paymentmode,
        enclosures: this.model1.enclosers,
        company_gst_number: this.model1.companygst,
        vendor_gst_number: this.model1.vendorgst,

        pr_number: this.PRNumber,
        line_item: this.SNO,
        material_code: this.matCode,
        material_description: this.matName,
        unit_of_measurment: this.UOM,
        quantity: this.qty,
        unit_price: this.UnitPRICE,
        tax_description: this.TAXDescription,
        tax_percent: this.TAXPercentage,
        // "tax_value":this.TAXValue,
        item_remarks: this.itemremarks,
        // "basic_price":this.BASICprice,
        // "total_price":this.TotalPRICE,
        command: "edt",
        number: this.editednumber
      };
      this.custservice.addpurchaseorderdata(obj).subscribe((res: any) => {
        if (res && res["status_code"] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res["message"],
            title: res["reference"],
            icon: "success",
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.PURCHASEdata12 = [];
          this.dataSource.data = [];
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.UnitPRICE = [];
          this.BASICprice = [];
          this.itemremarks = [];
          this.TAXDescription = [];
          this.TAXPercentage = [];
          this.TAXValue = [];
          this.TotalPRICE = [];
          this.PRNumber = [];
          this.PRDate = [];
          this.serialnumberdata = []
          this.prnumberarray = []
          this.getData();
          this.getlogdata()
          this.editModel.reason = ""
          this.PURCHASEORDERNO = this.editednumber
          if (this.fileUploadUrlspo.length > 0) {
            this.uploadingselectedfiles()
          }

        } else {
          this.alertcall.showWarning("Accepted", res["message"]);
          this.SNO = [];
          this.matCode = [];
          this.matName = [];
          this.UOM = [];
          this.qty = [];
          this.UnitPRICE = [];
          this.BASICprice = [];
          this.itemremarks = [];
          this.TAXDescription = [];
          this.TAXPercentage = [];
          this.TAXValue = [];
          this.TotalPRICE = [];
          this.PRNumber = [];
          this.PRDate = [];
          // this.serialnumberdata=[]
        }
      });
    }
  }
  uploadingselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Purchase Order");
    postData.append("document_number", this.PURCHASEORDERNO);
    for (const file of this.selectedfiles) {
      postData.append('doc', file);
    }
    // postData.append("doc",this.fileUploadUrlspo)

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        // this.alertcall.showSuccess("Accepted",res['message'])
        this.fileUploadUrlspo = []
        this.fileurls = []
        this.createNewFilepo.fileName = ""
        this.selectedfiles = []
        this.filenamearray1 = []
      } else {
        // this.alertcall.showWarning("Error",res['message'])
      }
    })
  }
  editdata(row1: any, index: any, data: any) {
    // this.editDATAA=false
    console.log(row1);

    this.selectedIndex = this.saveddataarray.indexOf(row1);
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: "600px",
    });
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1;
      }
    });
    this.model2.prnumber = row1.prnumber;
    this.model2.prdate = row1.prdate;
    this.model2.matcode = this.systemref || row1.matcode;
    this.model2.uom = row1.uom || row1.unit_of_measurment;
    this.model2.qty = row1.qty;
    this.model2.unitprice = row1.unitprice;
    this.model2.basicprice = row1.basicprice;
    this.model2.itemremarks = row1.itemremarks;
    this.model2.taxdesc = row1.taxdesc;
    this.model2.taxperc = row1.taxperc;
    this.model2.taxvalue = row1.taxvalue;
    this.model2.totalprice = row1.totalprice;
    this.getmasterdata();
    this.getstoragelocData();
    this.getvalutionData();
  }
  saveaddededitdata(fr: any) {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2matcode = el.code;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    this.model2["material_code"] = this.materialCODE;
    this.model2["material_description"] = this.materialNAME;
    this.saveddataarray.splice(this.selectedIndex, 1, this.model2);
    this.dataSource.data = this.saveddataarray;
    console.log(this.dataSource.data);

    this.saveddataarray[this.selectedIndex].matcode = this.model2matcode;

    this.model2 = {};
    this.dialog.closeAll();
  }
  selectedmastereditgroup() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2.uom = el.uom_1;
        this.materialCODE = el.code;
        this.materialNAME = el.name;
      }
    });
    console.log(this.model2matcode, this.model2matdes);
  }

  keyPressNumbers(evt: any) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }

  keyPressAlphanumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
    // validateNumber(e: any) {
    //   const reg = /^-?\d*(\.\d{0,2})?$/;
    //  let input = e.target.value + String.fromCharCode(e.charCode);

    //  if (!reg.test(input)) {
    //      e.preventDefault();
    //  }
  }
  selectedcompany() {
    this.companyData.forEach((el: any) => {
      if (el.name == this.model1.companyname) {
        this.model1.shippingadd = el.address_1
        this.model1.billingadd = el.address_1
      }
    });
  }
  printdmr(data: any) {
    console.log(data.number);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "dmrnumber": data.number
    //   }
    // };
    this.router.navigate(["/cp/print_purchase_order"], { queryParams: { 'ponumber': data.number } }
    );
  }
  editpodata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.PURCHASEdata12 = [];
    this.serialnumberdata = [];
    this.editednumber = data.number
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      // field: "number",
      key: this.editednumber,
    }
    this.custservice.addpurchaseorderdata(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      console.log(res);
      let PURCHASEdata1: any[] = [];
      PURCHASEdata1 = res.data;
      PURCHASEdata1.forEach((element: any) => {
        element["unit_price"] = element.unit_price;
        element["basic_price"] = element.basic_price;
        element["tax_description"] = element.tax_description;
        element["tax_percent"] = element.tax_percent;
        element["tax_value"] = element.tax_value;
        element["total_price"] = element.total_price || (element.basic_price + element.tax_value);
        element["item_remarks"] = element.item_remarks;
        element['number'] = element.pr_number
        this.serialnumberdata.push(element.line_item)
      });

      PURCHASEdata1.forEach((ele: any) => {
        // ele.forEach((element:any) => {
        this.PURCHASEdata12.push(ele);
        // });
        //  this.PURCHASEdata12.concat(ele)
      });


      this.editdataa = res.data[0]
      this.model1.dateee = moment(this.editdataa.date).format("YYYY-MM-DD")
      this.model1.companyname = this.editdataa.company_name,
        this.model1.comments = this.editdataa.comments,
        this.model1.vendorname = this.editdataa.vendor_name,
        this.model1.subject = this.editdataa.subject,
        this.model1.vendorref = this.editdataa.vendor_reference,
        this.model1.pricebasis = this.editdataa.price_basis,
        this.model1.otaxdesc = this.editdataa.other_tax_description,
        this.model1.otaxperc = this.editdataa.other_tax_percent,
        this.model1.otaxvalue = this.editdataa.other_tax_value,
        this.model1.freight = this.editdataa.freight,
        this.model1.tinsurance = this.editdataa.transist_insurance,
        this.model1.packingforward = this.editdataa.packing_forwarding,
        this.model1.qtytolerance = this.editdataa.quantity_tolerance,
        this.model1.deltime = this.editdataa.delivery_time,
        this.model1.shippingadd = this.editdataa.shipping_address,
        this.model1.billingadd = this.editdataa.billing_address,
        this.model1.paymentterms = this.editdataa.payment_terms,
        this.model1.unloadingscope = this.editdataa.unloading_scope,
        this.model1.paymentmode = this.editdataa.mode_of_payment,
        this.model1.enclosers = this.editdataa.enclosures,
        this.model1.companygst = this.editdataa.company_gst_number,
        this.model1.vendorgst = this.editdataa.vendor_gst_number,


        this.demo1TabIndex = 0;
      this.btn = "Update"

    })
  }

  //approval icon
  getApprovals(data:any, row1: any){
    // console.log(data.number);
    this.dialog.open(data, { // this.getConfirmData();
      width: '600px'
    })
    this.documnet_nodata=row1.number;
  }

getConfirmData(){
  let obj = {
    command: "add",
    document_name: "PurchaseOrder",
    document_number:this.documnet_nodata
  };
  this.custservice.AutoDocUpdate2(obj).subscribe((res: any) => {
    if(res && res['status_code']==200){
      this.dialog.closeAll()
      this.alertcall.showSuccess("Accepted", res['message'])
      this.getData()
    } else {
      this.dialog.closeAll()
      this.alertcall.showWarning("Error", res['message'])
    }      
  });
}
}
