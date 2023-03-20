import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef,Component, ElementRef, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Overlay } from 'ngx-toastr';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { E } from '@angular/cdk/keycodes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-outgatepassrgp1',
  templateUrl: './outgatepassrgp1.component.html',
  styleUrls: ['./outgatepassrgp1.component.scss']
})
export class Outgatepassrgp1Component implements OnInit {
  activitylogcolumns: any[] = [
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
  @ViewChild('deletedocsigned') deletedocsigned: TemplateRef<any>;
//SCANER
public scannerEnabled: boolean = true;
public information: string = "";
public errorScanner: string="";
doc_no: string; 
  dcnumber: any;
  DCDATA: any;
  selecteddcnumber: any;
  matcodedata: any;
  matDesc: string;
  documnet_nodata: any;

public scanSuccessHandler($event: any) {
  this.scannerEnabled = false;
  this.information = "";
  this.information = $event;
}

public enableScanner() {
  this.scannerEnabled = !this.scannerEnabled;
  this.information = "";
  this.scannerEnabled = true;
}
//END
  displayedColumns: any[] = [
    'sno',
    'material_code',
    'material_description',
    'unit_of_measurement',
    'storage_location',
    'request_quantity',
    'quantity',
    'unit_price',
    'total_price',
    'item_remarks',
    // 'batch_no',
    'valution_type',
    'action'

  ];
  displayedColumns1: any[] = [
    'sno',
    'Date',
    'number',
    'company_Name',
    'tocompanyname',
    'request_number',
    // 'transfer_type',
    'action'
  ];
  //variable declaration
  demo1TabIndex: any = 0;
  dialogRef: any = null;
  dataSource = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();
  formdata: any = {};
  companyData: any;
  selectedmaterial1: any;
  dialogdata: any = {quantity:0,unit_price:0};
  materialCODE: any;
  materialNAME: any;
  masterData: any;
  storageData: any;
  selectedstorage: any;
  valutiondata: any;
  saveddataarray: any[] = [];
  btn: any = "Save";
  SNO: any[] = [];
  matCode: any[] = [];
  matName: any[] = [];
  UOM: any[] = [];
  storageLocation: any[] = [];
  quantity: any[] = [];
  ReqQTY: any[] = [];
  itemremarks: any[] = [];
  unitPrice:any=[]
  basic_price:any=[]
  // batchno: any[] = [];
  valutionType: any[] = [];
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0
  reaData: boolean;
  loadingRecords: any = false;
  resultogpnumber: any;
  fileUploadUrlsgt: any[] = [];
  logdata: any;
  editednumber: any;
  editModel: any = {};
  dialogdataedit: any = {qty:0,unit_price:0};
  systemref: any;
  selectedIndex: number;
  dialogdataeditmatcode: any;
  dialogdataeditmatdes: any;
  editdataa: any;
  deleteid: any;
  outgatepassrgpnum: any;
  createNewFile: any = {};
  filedata: any;
  imageUrl= environment.base_url;
  deleteNumber: any;
  deletemodel: any = {};
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  filenamearray1: any[] = [];
  selectedfiles: any[] = [];
  searchData: any;
  columnname: any;
  smsdata: any;
  smsdata1: any;
  companyData1: any;
  total:number=0
  purposeList:any=[]
  selectedPurpose: any;
  selectedvendor: string;
  vendorData: any;
  docsign_status:boolean=false
  DCID: any[] = []
  editDATAA: any = false;
   //end
  constructor(private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private injector: Injector,
    private router: Router,
    
  ) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.formdata.dateee = moment(new Date()).format("YYYY-MM-DD");
    this.formdata.requestdate = moment(new Date()).format("YYYY-MM-DD");
    this.formdata.lrdate = moment(new Date()).format("YYYY-MM-DD");
    this.formdata.expectedredate = moment(new Date()).format("YYYY-MM-DD");
    this.getcompanydata();
    this.getcompanydata1();
    this.getmasterdata();
    this.getstoragelocData();
    this.getvalutionData();
    this.getData();
    this.getlogdata();
    this.getPurposeList();
    this.getvendordata();
  }

  //consignee 
  getvendordropdowndata(ev:any){
    console.log(ev.target.value);
    this.selectedvendor=ev.target.value
    if( this.selectedvendor.length>2){
   this.getvendordata()
    }
    if(! this.selectedvendor){
      this.getvendordata()
    }
  }
  getvendordata(){
    let obj={
      "command":"lst",
      "lmt":100000,
      "key":this.selectedvendor ||"",
    }
    this.custservice.getvendormasterdata(obj).subscribe((res:any)=>{
      this.vendorData=res.data
    })
  }
  //get companies list
  getcompanydata() {
    let obj = {
      "command": "lst"
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data
    })
  }
  getcompanydata1() {
    let obj = {
      command: "lst",
    };
    this.custservice.usercompanyData(obj).subscribe((res: any) => {
      this.companyData1 = res.data;
    });
  }
  //get material code/name
  getmaterialDATA(ev: any) {
    this.selectedmaterial1 = ev.target.value
    if (this.selectedmaterial1.length > 2) {
      this.getmasterdata();
    }
    if (!this.selectedmaterial1) {
      this.getmasterdata();
    }
  }
  //edit get material code/name
  getmaterialDATA1(ev: any) {
    this.selectedmaterial1 = ev.target.value
    if (this.selectedmaterial1.length > 2) {
      this.getmasterdata()
    }
    if (!this.selectedmaterial1) {
      this.getmasterdata()
    }
  }
  getmasterdata() {
    let obj = {
      "command": 'lst',
      "lmt": 100,
      "pid": 1,
      "key": this.selectedmaterial1,
      // "code":this.matcodedata
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      this.masterData = res.data
    //   this.masterData.forEach((ele: any) => {
    //     if (ele.code == this.matcodedata) {
    //       // alert(1)
    //       this.dialogdataedit.matcode = ele.system_reference_1
    //       // this.systemref = ele.system_reference_1
    //     }
    // });
    })
  }
  selectedmastergroup() {
    // console.log(this.dialogdata.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.dialogdata.matcode) {
        this.dialogdata.uom = ele.uom_1
        this.materialCODE = ele.code
        this.materialNAME = ele.name
      }
    });
    this.getSMSdata();
  }
  //get storage data
  getstorageDATA(ev: any) {
    // console.log(ev.target.value);
    this.selectedstorage = ev.target.value
    if (this.selectedstorage.length > 2) {
      this.getstoragelocData();
    }
  }
  getstoragelocData() {
    let obj = {
      "command": "mat",
      "field": "storage_location",
      "key": this.selectedstorage
    }
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data
    })
  }
  //get valuation data
  getvalutionData() {
    let obj = {
      "lmt": 100000,
      'pid': 1,
      "command": "lst",
      "key": ""
    }
    this.custservice.getvalutiondata(obj).subscribe((res: any) => {
      this.valutiondata = res.data
    })
  }
  //add service integration start
  savefinaldata(fr: any) {
    if (this.btn === "Save") {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1)
        this.matCode.push(ele.material_code)
        this.matName.push(ele.material_description  || ele.description)
        this.UOM.push(ele.uom || ele.unit_of_measurement)
        this.storageLocation.push(ele.storagelocation || ele.storage_location)
        this.ReqQTY.push(Number(ele.reqqty || ele.quantity))
        this.quantity.push(Number(ele.quantity || ele.qty))
        this.itemremarks.push(ele.itemremarks)
        this.unitPrice.push(ele.unit_price)
        this.basic_price.push(ele.basic_price)
        // this.batchno.push(ele.batchno)
        this.valutionType.push(ele.valutiontype  || ele.valuation_type)
      })
      let obj = {
        "work_order_number": this.formdata.workordernum,
        "date": moment(this.formdata.dateee).format("YYYY-MM-DD"),
        "company_name": this.formdata.companyname,
        "to_company_name": this.formdata.tocompanyname,
        "consignee_name": this.formdata.consigneename,
        "request_number": this.formdata.requestnumber,
        "request_date": moment(this.formdata.requestdate).format("YYYY-MM-DD"),
        "receiver_name": this.formdata.receivername,
        "Transfer_type":this.formdata.rgptype,
        // "Transfer_type": this.formdata.transfertype,
        "expected_return_date": moment(this.formdata.expectedredate).format("YYYY-MM-DD"),
        "vehicle_number": this.formdata.vehiclenumber,
        "transporter_name": this.formdata.transportername,
        "lr_number": this.formdata.lrnumber,
        "lr_date": moment(this.formdata.lrdate).format("YYYY-MM-DD"),
        "line_item": this.SNO,
        "material_code": this.matCode,
        "material_description": this.matName,
        "unit_of_measurment": this.UOM,
        "request_quantity": this.ReqQTY,
        "quantity": this.quantity,
        "item_remarks": this.itemremarks,
        "valuation_type": this.valutionType,
        "storage_location": this.storageLocation,
        "unit_price":this.unitPrice,
        "basic_price":this.basic_price,
        "to_locations":this.formdata.tolocation,
        "eway_bill":this.formdata.ewaybillno,
        // "batch_number": this.batchno,
        "comments": this.formdata.comments,
        "locations": this.formdata.location,
        "purpose": this.formdata.purpose,
        "work_order_value":this.formdata.workordervalue,
        "work_order_date":this.formdata.Workorderdate,
        "delivery_challan_number":this.dcnumber || "",
        "command": "add"

      }
      this.custservice.addoutgatepassrgp(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.saveddataarray = []
          this.dataSource.data = []
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.ReqQTY = []
          this.quantity = []
          this.itemremarks = []
          this.unitPrice=[],
          this.basic_price=[]
          this.valutionType=[]
          this.dcnumber=""
          // this.batchno = []
          this.getData()
          this.getlogdata()
          this.resultogpnumber = res['reference']
          if (this.fileUploadUrlsgt.length > 0) {
            this.uploadselectedfiles()
          }
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.ReqQTY = []
          this.quantity = []
          this.itemremarks = []
          this.unitPrice=[],
          this.basic_price=[]
          this.valutionType=[]
          // this.batchno = []
        }
      })
    } else {
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1)
        this.matCode.push(ele.material_code)
        this.matName.push(ele.material_description || ele.description)
        this.UOM.push(ele.uom || ele.unit_of_measurment || ele.unit_of_measurement)
        this.storageLocation.push(ele.storagelocation || ele.storage_location)
        this.ReqQTY.push(Number(ele.reqqty || ele.request_quantity || ele.quantity))
        this.quantity.push(Number(ele.quantity || ele.qty || ele.quantity))
        this.itemremarks.push(ele.itemremarks || ele.item_remarks)
        // this.batchno.push(ele.batchno || ele.batch_number)
        this.valutionType.push(ele.valutiontype || ele.valuation_type)
        this.unitPrice.push(ele.unit_price)
        this.basic_price.push(ele.basic_price)
      }
      )


      let obj = {
        "reason": this.editModel.reason,
        "work_order_number": this.formdata.workordernum,
        "date": moment(this.formdata.dateee).format("YYYY-MM-DD"),
        "company_name": this.formdata.companyname,
        "to_company_name": this.formdata.tocompanyname,
        "consignee_name": this.formdata.consigneename,
        "request_number": this.formdata.requestnumber,
        "request_date": moment(this.formdata.requestdate).format("YYYY-MM-DD"),
        "receiver_name": this.formdata.receivername,
        "Transfer_type":this.formdata.rgptype,
        // "Transfer_type": this.formdata.transfertype,
        "expected_return_date": moment(this.formdata.expectedredate).format("YYYY-MM-DD"),
        "vehicle_number": this.formdata.vehiclenumber,
        "transporter_name": this.formdata.transportername,
        "lr_number": this.formdata.lrnumber,
        "lr_date": moment(this.formdata.lrdate).format("YYYY-MM-DD"),
        "line_item": this.SNO,
        "material_code": this.matCode,
        "material_description": this.matName,
        "unit_of_measurment": this.UOM,
        "request_quantity": this.ReqQTY,
        "quantity": this.quantity,
        "item_remarks": this.itemremarks,
        "valuation_type": this.valutionType,
        "unit_price": this.unitPrice,
        "basic_price": this.basic_price,
        "storage_location": this.storageLocation,
        // "batch_number": this.batchno,
        "comments": this.formdata.comments,
        "command": "edt",
        "number": this.editednumber || this.doc_no,
        "locations": this.formdata.location,
        "to_locations":this.formdata.tolocation,
        "eway_bill":this.formdata.ewaybillno,
        "work_order_value":this.formdata.workordervalue,
        "work_order_date":this.formdata.Workorderdate,
        "purpose": this.formdata.purpose,
        "delivery_challan_number":this.dcnumber || ""
      }
      this.custservice.addoutgatepassrgp(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.saveddataarray = []
          this.dataSource.data = []
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.ReqQTY = []
          this.quantity = []
          this.itemremarks = []
          this.unitPrice=[]
          this.basic_price=[]
          // this.batchno = []
          this.getData()
          this.getlogdata()
          this.editModel.reason = ""
          this.resultogpnumber = this.editednumber
          if (this.fileUploadUrlsgt.length > 0) {
            this.uploadselectedfiles()
          }
          this.btn = "Save"
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.ReqQTY = []
          this.quantity = []
          this.itemremarks = []
          this.unitPrice=[]
          this.basic_price=[]
          // this.batchno = []
        }
      })
    }
  }
  //end

  //add outgatepassrgp model
  addoutgatePassRequest(data: any) {
    this.dialogdata.basic_price =0
    this.dialog.open(data, {
      width: "1100px",
    });
  }
  closedialogdata() {
    this.dialog.closeAll();
  }
  //add items modal , input fields data pushing to array
  saveaddeddata(form: any) {
    this.dialogdata['material_code'] = this.materialCODE
    this.dialogdata['material_description'] = this.materialNAME
    console.log(this.dialogdata);
    // this.editDATAA=true;
    this.saveddataarray.push(this.dialogdata)
    console.log(this.saveddataarray);
    this.dataSource.data = this.saveddataarray
    console.log(this.dataSource.data)
    this.dialogdata = {}
    this.dialog.closeAll()
     this.total=0
    this.saveddataarray.forEach((ele:any)=>{
    this.total += ele.basic_price
    })
    
  }
  //
  getData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex,
    }
    this.custservice.getoutgatepassrgp(obj).subscribe((res: any) => {
      console.log(res);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }

    })
  }
  //activity log
  getlogdata() {
    let obj = {
      command: "log",
      key: "OutGatePassRGP"
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
  //Edit service integration
  editdata(row1: any, index: any, data: any) {
    // this.matcodedata=row1.material_code
    // this.getmasterdata()
    this.selectedIndex = this.saveddataarray.indexOf(row1)
    console.log(this.selectedIndex);
    this.dialog.open(data, {
      width: '1100px'
    })
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1
      }
    });
    this.matDesc=row1.material_code+"-"+(row1.description || row1.material_description);
    this.materialCODE=row1.material_code;
    this.materialNAME=row1.description || row1.material_description;
    this.dialogdataedit.matcode = this.systemref || row1.matcode || this.matDesc
    this.dialogdataedit.uom = row1.uom || row1.unit_of_measurment || row1.unit_of_measurement 
    this.dialogdataedit.storagelocation = row1.storagelocation || row1.storage_location
    this.dialogdataedit.reqqty = row1.reqqty || row1.request_quantity || row1.quantity
    this.dialogdataedit.qty = row1.qty || row1.quantity
    this.dialogdataedit.itemremarks = row1.itemremarks || row1.item_remarks
    // this.dialogdataedit.batchno = row1.batchno || row1.batch_number
    this.dialogdataedit.valutiontype = row1.valutiontype || row1.valuation_type
    this.dialogdataedit.unit_price = row1.unit_price
    this.dialogdataedit.basic_price = row1.basic_price 
    // this.getmasterdata()
    // this.getstoragelocData()
    // this.getvalutionData()
  }
  saveaddededitdata(fr: any) {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.dialogdataedit.matcode) {
        this.dialogdataeditmatcode = el.code
        this.materialCODE = el.code
        this.materialNAME = el.name
      }
    });
    this.dialogdataedit['material_code'] = this.materialCODE
    this.dialogdataedit['material_description'] = this.materialNAME
    this.saveddataarray.splice(this.selectedIndex, 1, this.dialogdataedit);
    this.dataSource.data = this.saveddataarray
    console.log(this.dataSource.data);

    this.saveddataarray[this.selectedIndex].matcode = this.dialogdataeditmatcode
    this.dialogdataedit = {}
    this.dialog.closeAll()
    this.total=0
    this.saveddataarray.forEach((ele:any)=>{
    this.total += ele.basic_price || ele.total_value
    })
  }
  selectedmastereditgroup() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.dialogdataedit.matcode) {
        this.dialogdataedit.uom = el.uom_1
        this.materialCODE = el.code
        this.materialNAME = el.name
      }


    });
    this.getSMSdata();
    console.log(this.dialogdataeditmatcode, this.dialogdataeditmatdes);
  }

  keyPressNumbers(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  editgtdata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.editednumber = data.number
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      // field: "number",
      number: this.editednumber || this.doc_no,

    }
    this.custservice.addoutgatepassrgp(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      this.editdataa = res.data[0]
      this.saveddataarray = res.data
      this.dataSource.data = this.saveddataarray
      this.formdata.workordernum = this.editdataa.work_order_number,
        this.formdata.dateee = moment(this.editdataa.date).format("YYYY-MM-DD"),
        this.formdata.companyname = this.editdataa.company_name,
        this.formdata.tocompanyname = this.editdataa.to_company_name,
        this.formdata.requestnumber = this.editdataa.request_number,
        this.formdata.requestdate = moment(this.editdataa.request_date).format("YYYY-MM-DD"),
        this.formdata.receivername = this.editdataa.receiver_name,
        this.formdata.rgptype=this.editdataa.Transfer_type,
        // this.formdata.transfertype = this.editdataa.Transfer_type,
        this.formdata.expectedredate = moment(this.editdataa.expected_return_date).format("YYYY-MM-DD"),
        this.formdata.vehiclenumber = this.editdataa.vehicle_number,
        this.formdata.transportername = this.editdataa.transporter_name,
        this.formdata.lrnumber = this.editdataa.lr_number,
        this.formdata.lrdate = moment(this.editdataa.lr_date).format("YYYY-MM-DD"),
        this.formdata.comments = this.editdataa.comments,
        this.formdata.consigneename = this.editdataa.consignee_name,
        this.formdata.location = this.editdataa.locations,
        this.formdata.purpose = this.editdataa.purpose,
        this.formdata.tolocation =this.editdataa.to_locations,
        this.formdata.ewaybillno=this.editdataa.eway_bill,
        this.formdata.workordervalue=this.editdataa.work_order_value,
        this.formdata.Workorderdate=moment(this.editdataa.work_order_date).format("YYYY-MM-DD"),
        // this.formdata.dcnumber=this.editdataa.delivery_challan_number,
      this.demo1TabIndex = 0;
      this.btn = "Update"
    })
  }
  //delete service integration
  deleteItem(rw: any, data: any) {

    this.dialog.open(data, {
      width: '400px',
      // scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.number
  }
  deleteSeleted(data:any){
    this.dialog.closeAll()
    this.dialog.open(data, {
      width: '400px',
    })
  }
  deleteFile() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
      "reason": this.deletemodel.reason,
      "pwd":this.deletemodel.pwd
    }
    this.custservice.deleteoutgatepassrgp(obj).subscribe((res: any) => {
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason = ""
        this.getData()
        this.getlogdata()
        this.docsign_status=false
      }else if (res && res['status_code'] == "501"){
        this.docsign_status=true
        this.dialog.closeAll()
        this.dialog.open(this.deletedocsigned,{
          width:"400px"
        })
        this.deletemodel.reason = ""
        // this.getData()
        // this.getlogdata()
        // this.deletemodel.reason = ""
      } else {
        this.dialog.closeAll()
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  deleterow(index: any) {
    console.log(index);

    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray
    console.log(this.dataSource.data)
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
      .set("document_number", this.outgatepassrgpnum,)
      .set("document_type", "Out_Gate_Pass_RGP")
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
  //upload service integration
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.outgatepassrgpnum = row1.number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.outgatepassrgpnum,)
      .set("document_type", "Out_Gate_Pass_RGP")
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata = res.data
        this.createNewFile.fileName = ''
      } else {
        this.filedata = ''
        console.log(this.filedata);
      }
    })
  }
  viewDoc(file: any) {
    console.log(file);  
    const url = this.imageUrl + '/' + file.file_path;
    // console.log(url);  
    window.open(url, '_blank');
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
        this.filenamearray1.push(file.name)

      }
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Out_Gate_Pass_RGP");
    postData.append("document_number", this.outgatepassrgpnum);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }

    let obj = {
      "document_type": "Out_Gate_Pass_RGP",
      "document_number": this.outgatepassrgpnum,
      "doc": this.fileUploadUrls
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.filenamearray1 = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploadgtfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsgt = fileInput.target.files;
      for (const file of this.fileUploadUrlsgt) {
        this.filenamearray.push(file.name)
        this.selectedfiles.push(file)
      }

    }
  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Out_Gate_Pass_RGP");
    postData.append("document_number", this.resultogpnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }

    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filenamearray = []
        this.selectedfiles = []
        this.fileUploadUrlsgt = []
      }
    })
  }
  //print service integration
  printoutgatepass(data: any) {
    console.log(data.number);
    this.router.navigate(['/inventory/printoutgatepassrgp1'], { queryParams: { 'ogpnumber': data.number } })
    // if (data.Transfer_type === "NRGP1") {
    //   this.router.navigate(['/planning/printoutgatepassrgpnrgp1'],{ queryParams: {'ogpnumber': data.number}})
    // } else {
    //   this.router.navigate(['/planning/printoutgatepassrgp1'], { queryParams: { 'ogpnumber': data.number } })

    // }
  }

  

  //search
  onChange() {
    console.log('Selected:',this.columnname);
    this.searchData=""    
  // this.searchData=this.columnname
  // let selectedColumn=this.searchData
  }
  search(){
    console.log(this.searchData); 
   let obj= {"command":"lst","field":this.columnname ,"key":this.searchData,"lmt":this.pageSize,"pid":this.pageIndex}
    if(this.searchData.length>2){
      this.custservice.getoutgatepassrgp(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data
        if (res.data.length == 0) {
          this.reaData = true
        }
      })
    }else if(!this.searchData){
      this.getData()
      this.columnname=""
    }
  }
  getSMSdata() {
    let obj = {
      material_code: this.materialCODE,
      command: "sms",
    };
    this.custservice.getsmsdata(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res["status_code"] == "200") {
        console.log(res);

        this.smsdata = res.message;
        this.smsdata1=res.storage_locations;
      } else {
        this.smsdata = "";
        this.smsdata1="";
        this.alertcall.showWarning("Warning", res["message"]);
      }
    });
  }
  getPurpose(ev:any){
this.selectedPurpose=ev.target.value
if(this.selectedPurpose.length>2){
  this.getPurposeList()
}if(!this.selectedPurpose){
  this.getPurposeList()
}
  }
  getRGPQTY(ev:any){
    this.dialogdata.basic_price= Number(this.dialogdata.quantity)*Number(this.dialogdata.unit_price)
  }
  getRGPQTYedit(){
    this.dialogdataedit.basic_price= Number(this.dialogdataedit.qty)*Number(this.dialogdataedit.unit_price)
  }
  getPurposeList(){
    let obj={
"command":"pps",
"key":this.selectedPurpose||""
    }
    this.custservice.getPurpose(obj).subscribe((res:any)=>{
     if(res){
      this.purposeList=res.data
     }
    })
  }

  //Scanner  model
  qrScanner(data: any) {
    this.dialog.open(data, {
      width: '400px',
    })
    this.information=""
    this.scannerEnabled=true
    this.errorScanner=""
  }
  confirmQrCode(){
    // alert(1)
    // console.log(this.information);
    if(this.information.length > 0){
      this.doc_no=this.information.split(":")[1].split(",")[0]
      setTimeout(() => {
        this.saveeditreason()
      }, 100);
    }
    else{
      // this.infoScan()
      this.alertcall.showWarning("Warning", "Please Scan QR Code");
      // this.errorScanner="Please Scan QR Code" 
    }
  }
  //  infoScan(){
  //   if(this.information.length ==0){
  //     this.errorScanner="Please Scan QR Code"    
  //   }else{
  //     this.errorScanner=""
  //   }
  //  }

  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getData()
  }
  submitform(data:any){
    this.dialog.open(data,{
      width:"400px"
    })
  }

  getdcDATA11(ev: any) {
    console.log(ev.target.value);
    this.selecteddcnumber = ev.target.value
    if (this.selecteddcnumber.length > 2) {
      this.getdcData()
    }
    if (!this.selecteddcnumber) {
      this.getdcData()
    }
  }
  getdcData() {
    let obj = {
       "command":"dcn",
      // "command": "set",
      // "lmt" : 100000,
      // "pid" : 1 ,
      "key": this.dcnumber
    }
    this.custservice.getoutgatepassrgp(obj).subscribe((res: any) => {
      this.DCDATA = res.data

    })
  }

  deliveryChallanData(data: any) {
     this.DCID = []
    this.dialog.open(data, {
      width: '600px'
    })
    this.getdcData()
  }

  submitdcno(fr: any) {
    let obj = {
      "command": "mat",
      "key": this.dcnumber,
      field: "number",
    }
    this.custservice.addDeliveryChallan(obj).subscribe((res: any) => {
      this.dialog.closeAll();
      this.editdataa = res.data[0]
      this.saveddataarray = res.data
      this.dataSource.data = this.saveddataarray
        this.formdata.dateee = moment(this.editdataa.date).format("YYYY-MM-DD"),
        this.formdata.companyname = this.editdataa.company_name,
        this.formdata.tocompanyname = this.editdataa.to_company_name,
        this.formdata.vehiclenumber = this.editdataa.vehicle_number,
        this.formdata.transportername = this.editdataa.transporter_name,
        this.formdata.lrnumber = this.editdataa.lr_number,
        this.formdata.lrdate = moment(this.editdataa.lr_date).format("YYYY-MM-DD"),
        this.formdata.consigneename = this.editdataa.consignee_name,  
        // this.formdata.dcnumber=this.dcnumber,   
      this.demo1TabIndex = 0;
      // this.btn = "Update"
    });
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
    document_name: "OutGatePassRGP",
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
