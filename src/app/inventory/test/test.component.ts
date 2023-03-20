import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { I } from '@angular/cdk/keycodes';
import { PrintdmrComponent } from '../printdmr/printdmr.component';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { post } from 'jquery';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  addItemsData: boolean = false;
  mainInputs: boolean = true;

  @ViewChild('deletefileModel') deletefileModel: ElementRef;

  displayedColumns: any[] = [
    'sno',
    'material_code',
    'material_description',
    'unit_of_measurement',
    'storage_location',
    'valution_type',
    'invoice_quantity',
    'received_quantity',
    'shortage_quantity',
    'excess_quantity',
    'unit_price',
    'discount_percent',
    'discount_value',
    'basic_price',
    'tax_description',
    'tax_percent',
    'tax_value',
    'freight_split',
    'other_charges_split',
    'other_tax_split',
    'total_price',
    'action'

  ];
  displayedColumns1: any[] = [
    'sno',
    'DMRNumber',
    'Date',
    'ProjectName',
    'VendorName',
    'InvoiceNumber',
    // 'ActiveStatus',
    'action'
  ];
  model: any = {
    excsqty: 0, invqty: 0, recqty: 0, shrtqty: 0, unitprice: 0, dispercentage: 0, disvalue: 0,
    basicprice: 0, taxpercentage: 0, taxvalue: 0,
  };
  model1: any = {};
  model2: any = {}
  editmodel: any = {}
  saveddataarray: any[] = []
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource()
  dataSourcemain = new MatTableDataSource();
  valuefrminv: any = 0
  valuefrmrec: any = 0
  unitValue: any = 0
  discValue: any = 0
  taxPercent: any = 0
  masterData: any;
  taxData: any;
  companyData: any;
  vendorData: any;
  transporterName: any;
  vehicleNum: any;
  basicFreight: any = 0
  freightPercentage: any = 0
  freightPercentage1: any = 0
  storageData: any;
  matCode: any[] = [];
  matName: any[] = []
  UOM: any[] = [];
  storageLocation: any[] = []
  valutionType: any[] = []
  InvoiceQuantity: any[] = []
  RecQTY: any[] = []
  shrQTY: any[] = []
  excsQTY: any[] = []
  unitPrice: any[] = []
  discPERCENT: any[] = []
  discVALUE: any[] = []
  basicPRICE: any[] = []
  taxDESC: any[] = []
  taxPERCEN: any[] = []
  taxVALUE: any[] = []
  POID: any[] = []
  otherTAXSPLIT: any[] = []
  SNO: any[] = []
  freightSPLIT: any[] = []
  othertaxSPLIT: any[] = []
  otherchargesSPLIT: any = []
  totalPRICE: any[] = []
  addedTableData: any = true;
  savedTableData: any = false;
  totalRecords: any = 0
  reaData: boolean;
  loadingRecords: any = false;
  pageIndex: any = 1;
  pageSize: any = 10;
  deleteNumber: any;
  model2matcode: any;
  model2matdes: any;
  valuefrminvedit: any = 0
  valuefrmrecedit: any = 0
  unitValueedit: any = 0
  discValueedit: any = 0
  editedtaxdescription: any;
  selectedIndex = -1;
  SUM: any = 0
  editabledata: any;
  editDATAA: any = false;
  materialCODE: any;
  materialNAME: any;
  systemref: any;
  NUMBER: any;
  basicFreight1: any = 0
  selectedtransporter: any;
  selectedvehiclenum: any;
  selectedvehiclenum1: any;
  selectedtransporter1: any;
  selectedmaterial: any;
  selectedstorage: any;
  selectedstorage1: any;
  selectedmaterial1: any;
  copieddmr: any;
  tabledata: any;
  DMRDATA: any;
  selecteddmr: any;
  valutiondata: any;
  ponumber: any;
  PODATA: any;
  selectedponumber: any;
  poiddata: any[] = []
  invoiceqty: any[] = []
  fileUploadUrls: any[] = []
  fileUploadUrlsdmr: any[] = []
  createNewFile: any = {}
  dmrnumber: any;
  filedata: any;
  imageUrl = environment.base_url;
  deleteid: any;
  dialogRef: any = null;
  generateddmr: any;
  filenamearray: any[] = []
  selectedfiles: any[] = []
  editednumber: any;
  demo1TabIndex: any = 0;
  btn: any = "Save"
  editdataa: any;
  logdata: any;
  deletemodel: any = {}
  editModel: any = {}
  selectedgen: any;
  GENDATA: any;
  constructor(private dialog: MatDialog, private custservice: CustomerService,
    private snackbar: MatSnackBar, public overlay: Overlay,
    private alertcall: AlertCallsService, private router: Router,
    private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.model1.dateee = moment(new Date()).format("YYYY-MM-DD")
    this.model1.podate = moment(new Date()).format("YYYY-MM-DD")
    this.model1.gedate = moment(new Date()).format("YYYY-MM-DD")
    this.model1.invdate = moment(new Date()).format("YYYY-MM-DD")
    this.model1.dcdate = moment(new Date()).format("YYYY-MM-DD")
    this.model1.irdate = moment(new Date()).format("YYYY-MM-DD")
    this.getmasterdata()
    this.getTaxlistdata();
    this.getcompanydata()
    this.getvendordata()
    this.getTransporterdata()
    this.getvehiclenumdata()
    this.getstoragelocData()
    this.getData()
    this.getdropdownData()
    this.getvalutionData()
    this.getlogdata()
    this.getgateentrynumberdata()
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "DailyMaterialReceipt"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
    })
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.dmrnumber = row1.number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.dmrnumber,)
      .set("document_type", "Daily Material Receipt")
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
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
      .set("document_number", this.dmrnumber,)
      .set("document_type", "Daily Material Receipt")
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

    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Daily Material Receipt");
    postData.append("document_number", this.dmrnumber);
    for (const file of this.fileUploadUrls)
      postData.append("doc", file)
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.fileUploadUrls = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploaddmrfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsdmr = fileInput.target.files;
      console.log(this.fileUploadUrlsdmr);
      for (const file of this.fileUploadUrlsdmr) {
        this.filenamearray.push(file.name)
        this.selectedfiles.push(file)
      }
      console.log(this.filenamearray);


    }

  }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Daily Material Receipt");
    postData.append("document_number", this.generateddmr);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }


    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.fileUploadUrlsdmr = []
        this.selectedfiles = []
        this.filenamearray = []
      } else {

      }
    })
  }
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
  clearpage() {
    this.saveddataarray = []
    this.dataSource.data = []
    this.editabledata = null
    this.editmodel = {}
    this.editDATAA = false;
  }
  clearpage1() {
    this.saveddataarray = []
    this.dataSource.data = []

    this.model1 = {}
    this.model = {}
  }
  copydmr(data: any) {
    this.POID = []
    this.dialog.open(data, {
      width: '600px'
    })
  }
  submitdmrno(fr: any) {
    // this.editsaveddata("")
    // this.editDATAA=false;
    // this.NUMBER=this.copieddmr
    // this.NUMBER=data.number


    let obj = {
      "command": "mat",
      "key": this.copieddmr,
      "field": "number"
    }
    this.custservice.editmaterialreceiptdata(obj).subscribe((res: any) => {
      this.saveddataarray = res.data
      res.data.forEach((ele: any) => {
        this.POID.push(ele.po_id)
      })
      this.dataSource.data = this.saveddataarray
      this.tabledata = res.data[0]
      this.model1.companyname = this.tabledata.company_name
      this.model1.dateee = moment(this.tabledata.date).format("YYYY-MM-DD")
      this.model1.ponumber = this.tabledata.purchase_order_number
      this.model1.podate = moment(this.tabledata.purchase_order_date).format("YYYY-MM-DD")
      this.model1.genumber = this.tabledata.gate_entry_number
      this.model1.gedate = moment(this.tabledata.gate_entry_date).format("YYYY-MM-DD")
      this.model1.invoicenumber = this.tabledata.invoice_number
      this.model1.invdate = moment(this.tabledata.invoice_date).format("YYYY-MM-DD")
      this.model1.dcnumber = this.tabledata.dc_number
      this.model1.dcdate = moment(this.tabledata.dc_date).format("YYYY-MM-DD")
      this.model1.vendorname = this.tabledata.vendor_name
      this.model1.packdetails = this.tabledata.packing_details
      this.model1.trsname = this.tabledata.transporter_name
      this.model1.vnumber = this.tabledata.vehicle_number
      this.model1.irnumber = this.tabledata.lr_number
      this.model1.irdate = moment(this.tabledata.lr_date).format("YYYY-MM-DD")
      this.model1.basicfreight = this.tabledata.basic_freight
      this.model1.frtaxdescription = this.tabledata.freight_tax_description
      this.model1.frtaxpercentage = this.tabledata.freight_tax_percent
      this.model1.frtaxvalue = this.tabledata.freight_tax_value
      this.model1.totalfreight = this.tabledata.total_freight
      this.model1.othercharges = this.tabledata.other_charges_description
      this.model1.otherchargesval = this.tabledata.other_charges_value
      this.model1.othertaxdescription = this.tabledata.other_tax_description
      this.model1.othertaxper = this.tabledata.other_tax_percent
      this.model1.othertaxvalue = this.tabledata.other_tax_value
      this.model1.qualitycheck = this.tabledata.quality_check
      this.model1.comments = this.tabledata.comments
      this.model1.waybillno = this.tabledata.waybillno
      console.log(this.model1.vendorname);
      this.SUM = 0
      this.saveddataarray.forEach((el: any) => {
        this.SUM += el.basic_price
      })
      console.log(this.SUM);
      this.dialog.closeAll()
      // this.copieddmr=''
      // this.model1.add({vendorname:this.editabledata.vendor_name})
    })
  }
  deleterow(index: any) {
    console.log(index);

    this.saveddataarray.splice(index, 1);
    this.dataSource.data = this.saveddataarray
    console.log(this.dataSource.data)
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData()
  }
  deleteItem(rw: any, data: any) {

    this.dialog.open(data, {
      width: '400px',
      scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.number
  }

  deleteFile() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
      "reason": this.deletemodel.reason
    }
    this.custservice.deletematerialreceiptdata(obj).subscribe((res: any) => {
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);

        this.dialog.closeAll()
        this.deletemodel.reason = ""
        this.getData()
        this.getlogdata()
      } else {
        this.alertcall.showSuccess('Accepted', res['message']);
      }
    })
  }
  getData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex,
      "key": ""
    }
    this.custservice.getmaterialreceiptdata(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }

    })
  }
  getdmrDATA(ev: any) {
    console.log(ev.target.value);
    this.selecteddmr = ev.target.value
    if (this.selecteddmr.length > 2) {
      this.getdropdownData()
    }
    if (!this.selecteddmr) {
      this.getdropdownData()
    }
  }
  getdropdownData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selecteddmr
    }
    this.custservice.getmaterialreceiptdata(obj).subscribe((res: any) => {

      this.DMRDATA = res.data


    })
  }
  editsaveddata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.editednumber = data.number

  }
  saveeditreason() {
    let obj = {
      "command": "mat",
      "key": this.editednumber,
      "field": "number"
    }
    this.custservice.editmaterialreceiptdata(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      this.saveddataarray = res.data
      this.dataSource.data = this.saveddataarray
      this.editabledata = res.data[0]
      this.model1.companyname = this.editabledata.company_name
      this.model1.dateee = moment(this.editabledata.date).format("YYYY-MM-DD")
      this.model1.ponumber = this.editabledata.purchase_order_number
      this.model1.podate = moment(this.editabledata.purchase_order_date).format("YYYY-MM-DD")
      this.model1.genumber = this.editabledata.gate_entry_number
      this.model1.gedate = moment(this.editabledata.gate_entry_date).format("YYYY-MM-DD")
      this.model1.invoicenumber = this.editabledata.invoice_number
      this.model1.invdate = moment(this.editabledata.invoice_date).format("YYYY-MM-DD")
      this.model1.dcnumber = this.editabledata.dc_number
      this.model1.dcdate = moment(this.editabledata.dc_date).format("YYYY-MM-DD")
      this.model1.vendorname = this.editabledata.vendor_name
      this.model1.packdetails = this.editabledata.packing_details
      this.model1.trsname = this.editabledata.transporter_name
      this.model1.vnumber = this.editabledata.vehicle_number
      this.model1.irnumber = this.editabledata.lr_number
      this.model1.irdate = moment(this.editabledata.lr_date).format("YYYY-MM-DD")
      this.model1.basicfreight = this.editabledata.basic_freight
      this.model1.frtaxdescription = this.editabledata.freight_tax_description
      this.model1.frtaxpercentage = this.editabledata.freight_tax_percent
      this.model1.frtaxvalue = this.editabledata.freight_tax_value
      this.model1.totalfreight = this.editabledata.total_freight
      this.model1.othercharges = this.editabledata.other_charges_description
      this.model1.otherchargesval = this.editabledata.other_charges_value
      this.model1.othertaxdescription = this.editabledata.other_tax_description
      this.model1.othertaxper = this.editabledata.other_tax_percent
      this.model1.othertaxvalue = this.editabledata.other_tax_value
      this.model1.qualitycheck = this.editabledata.quality_check
      this.model1.comments = this.editabledata.comments
      this.model1.waybillno = this.editabledata.way_bill_number
      console.log(this.model1.vendorname);
      this.SUM = 0
      this.saveddataarray.forEach((el: any) => {
        this.SUM += el.basic_price
      })
      console.log(this.SUM);
      this.demo1TabIndex = 0;
      this.btn = "Update"
      // this.copieddmr=''
      // this.model1.add({vendorname:this.editabledata.vendor_name})
    })

  }
  //   gettotalvalue(){
  //     console.log(this.saveddataarray);

  //   this.saveddataarray.forEach((ele:any)=>{

  //     // this.freightSPLIT.push(((ele.basicprice|| ele.basic_price)/this.SUM)*this.editmodel.totalfreight)
  //     // this.otherchargesSPLIT.push(((ele.basicprice|| ele.basic_price)/this.SUM)*this.editmodel.otherchargesval)
  //     // this.othertaxSPLIT.push(((ele.basicprice|| ele.basic_price)/this.SUM)*this.editmodel.othertaxvalue)
  //     this.totalPRICE.push((+(ele.basicprice|| ele.basic_price)+(ele.taxvalue|| ele.tax_value)+(((ele.basicprice|| ele.basic_price)/this.SUM)*this.editmodel.totalfreight )+
  //     (((ele.basicprice|| ele.basic_price)/this.SUM)*this.editmodel.otherchargesval)+
  //     (((ele.basicprice|| ele.basic_price)/this.SUM)*this.editmodel.othertaxvalue)))
  //   })
  //   console.log(this.totalPRICE);

  // }
  saveupdateddata() {
    console.log(this.saveddataarray);

    this.saveddataarray.forEach((ele: any, index) => {
      this.SNO.push(index + 1)
      this.matCode.push(ele.material_code || this.materialCODE)
      this.matName.push(ele.material_description || this.materialNAME)
      this.UOM.push(ele.unit_of_measurment || ele.uom)
      this.storageLocation.push(ele.storage_location || ele.storagelocation)
      this.valutionType.push(ele.valuation_type || ele.valutiontype)
      this.InvoiceQuantity.push(Number(ele.invoice_quantity) || Number(ele.invqty))
      this.RecQTY.push(Number(ele.received_quantity) || Number(ele.recqty))
      this.shrQTY.push(ele.shortage_quantity || ele.shrtqty)
      this.excsQTY.push(ele.excess_quantity || ele.excsqty)
      this.unitPrice.push(Number(ele.unit_price) || Number(ele.unitprice))
      this.discPERCENT.push(Number(ele.discount_percent) || Number(ele.dispercentage))
      this.discVALUE.push(ele.discount_value || ele.disvalue)
      this.basicPRICE.push(ele.basic_price || ele.basicprice)
      this.taxDESC.push(ele.tax_description || ele.taxdescription)
      this.taxPERCEN.push(ele.tax_percent || ele.taxpercentage)
      this.taxVALUE.push(ele.tax_value || ele.taxvalue)
      // this.otherTAXSPLIT.push(ele.other_tax_split)

    }
    )
    this.saveddataarray.forEach((ele: any) => {
      this.freightSPLIT.push(((ele.basicprice || ele.basic_price) / this.SUM) * this.editmodel.totalfreight)
      this.otherchargesSPLIT.push(((ele.basicprice || ele.basic_price) / this.SUM) * this.editmodel.otherchargesval)
      this.othertaxSPLIT.push(((ele.basicprice || ele.basic_price) / this.SUM) * this.editmodel.othertaxvalue)
      this.totalPRICE.push((+(ele.basicprice || ele.basic_price) + (ele.taxvalue || ele.tax_value) + (((ele.basicprice || ele.basic_price) / this.SUM) * this.editmodel.totalfreight) +
        (((ele.basicprice || ele.basic_price) / this.SUM) * this.editmodel.otherchargesval) +
        (((ele.basicprice || ele.basic_price) / this.SUM) * this.editmodel.othertaxvalue)))
    })
    let obj = {
      "comments": this.editmodel.comments,

      "date": moment(this.editmodel.dateee).format("YYYY-MM-DD"),
      "purchase_order_number": this.editmodel.ponumber,

      "purchase_order_date": moment(this.editmodel.podate).format("YYYY-MM-DD"),

      "company_name": this.editmodel.companyname,

      "vendor_name": this.editmodel.vendorname,

      "invoice_number": this.editmodel.invoicenumber,

      "invoice_date": moment(this.editmodel.invdate).format("YYYY-MM-DD"),

      "dc_number": this.editmodel.dcnumber,

      "dc_date": moment(this.editmodel.dcdate).format("YYYY-MM-DD"),

      "packing_details": this.editmodel.packdetails,

      "gate_entry_number": this.editmodel.genumber,

      "gate_entry_date": moment(this.editmodel.gedate).format("YYYY-MM-DD"),

      "transporter_name": this.editmodel.trsname,

      "vehicle_number": this.editmodel.vnumber,

      "lr_number": this.editmodel.irnumber,

      "lr_date": moment(this.editmodel.irdate).format("YYYY-MM-DD"),
      "line_item": this.SNO,

      "material_code": this.matCode,

      "material_description": this.matName,

      "unit_of_measurment": this.UOM,

      "storage_location": this.storageLocation,

      "invoice_quantity": this.InvoiceQuantity,

      "received_quantity": this.RecQTY,

      "shortage_quantity": this.shrQTY,

      "excess_quantity": this.excsQTY,

      "unit_price": this.unitPrice,

      "discount_percent": this.discPERCENT,

      "discount_value": this.discVALUE,
      "basic_price": this.basicPRICE,

      "tax_description": this.taxDESC,

      "tax_percent": this.taxPERCEN,

      "tax_value": this.taxVALUE,

      "freight_split": this.freightSPLIT,

      "basic_freight": Number(this.editmodel.basicfreight),

      "freight_tax_description": this.editmodel.frtaxdescription,

      "freight_tax_percent": Number(this.editmodel.frtaxpercentage),

      "freight_tax_value": this.editmodel.frtaxvalue,

      "total_freight": this.editmodel.totalfreight,

      "other_charges_description": this.editmodel.othercharges,

      "other_charges_value": Number(this.editmodel.otherchargesval),

      "other_charges_split": this.otherchargesSPLIT,

      "other_tax_description": this.editmodel.othertaxdescription,

      "other_tax_percent": Number(this.editmodel.othertaxper),

      "other_tax_value": Number(this.editmodel.othertaxvalue),

      "other_tax_split": this.othertaxSPLIT,

      "total_price": this.totalPRICE,

      "quality_check": this.editmodel.qualitycheck,
      "way_bill_number": this.editmodel.waybillno,
      "valution_type": this.valutionType,
      "command": "edt",

      "number": this.NUMBER
    }
    this.custservice.editmaterialreceiptdata(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess('Accepted', res['message']);
        // fr1.reset()
        this.editmodel = {}
        this.saveddataarray = []
        this.dataSource.data = []
        this.matCode = []
        this.SNO = []
        this.matCode = []
        this.matName = []
        this.UOM = []
        this.storageLocation = []
        this.InvoiceQuantity = []
        this.RecQTY = []
        this.shrQTY = []
        this.excsQTY = []
        this.unitPrice = []
        this.discPERCENT = []
        this.discVALUE = []
        this.basicPRICE = []
        this.taxDESC = []
        this.taxPERCEN = []
        this.taxVALUE = []
        this.freightSPLIT = []
        this.otherchargesSPLIT = []
        this.othertaxSPLIT = []
        this.totalPRICE = []
        this.valutionType = []
        this.getData()
      } else {
        this.alertcall.showWarning('Accepted', res['message']);
        this.matCode = []
        this.SNO = []
        this.matCode = []
        this.matName = []
        this.UOM = []
        this.storageLocation = []
        this.InvoiceQuantity = []
        this.RecQTY = []
        this.shrQTY = []
        this.excsQTY = []
        this.unitPrice = []
        this.discPERCENT = []
        this.discVALUE = []
        this.basicPRICE = []
        this.taxDESC = []
        this.taxPERCEN = []
        this.taxVALUE = []
        this.freightSPLIT = []
        this.otherchargesSPLIT = []
        this.othertaxSPLIT = []
        this.totalPRICE = []
        this.valutionType = []
      }

    })
  }
  getstorageDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage = ev.target.value
    if (this.selectedstorage.length > 2) {
      this.getstoragelocData()
    }
  }
  getstorageDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedstorage1 = ev.target.value
    if (this.selectedstorage1.length > 2) {
      this.getstoragelocData()
    }
  }
  getstoragelocData() {
    let obj = {
      "command": "mat",
      "field": "storage_location",
      "key": this.selectedstorage || this.selectedstorage1
    }
    this.custservice.getmatstoragelocdata(obj).subscribe((res: any) => {
      this.storageData = res.data



    })
  }
  getvehiclenumDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedvehiclenum = ev.target.value
    if (this.selectedvehiclenum.length > 2) {
      this.getvehiclenumdata()
    }
  }
  getvehiclenumDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedvehiclenum1 = ev.target.value
    if (this.selectedvehiclenum1.length > 2) {
      this.getvehiclenumdata()
    }
  }
  getvehiclenumdata() {
    let obj = {
      "command": "mat",
      "field": "vehicle_number",
      "key": this.selectedvehiclenum || this.selectedvehiclenum1,
    }
    this.custservice.getmatvehiclenumdata(obj).subscribe((res: any) => {
      this.vehicleNum = res.data
    })
  }
  gettransportDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedtransporter = ev.target.value
    if (this.selectedtransporter.length > 2) {
      this.getTransporterdata()
    }
    if (!this.selectedtransporter) {
      this.getTransporterdata()
    }
  }
  gettransportDATA1(ev: any) {
    console.log(ev.target.value);
    this.selectedtransporter1 = ev.target.value
    if (this.selectedtransporter1.length > 2) {
      this.getTransporterdata()
    }
    if (!this.selectedtransporter1) {
      this.getTransporterdata()
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
  getvendordata() {
    let obj = {
      "command": "lst"
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
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data

    })
  }
  getmaterialDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial = ev.target.value
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata()
    }
    if (!this.selectedmaterial) {
      this.getmasterdata()
    }
  }
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
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedmaterial || this.selectedmaterial1
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data

    })
  }
  getTaxlistdata() {
    let obj = {
      "command": "lst",

    }
    this.custservice.gettaxlistdata(obj).subscribe((res: any) => {
      this.taxData = res.data
    })
  }
  selectedmastergroup() {
    console.log(this.model.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.model.matcode) {
        this.model.uom = ele.uom_1
        this.materialCODE = ele.code
        this.materialNAME = ele.name
      }
    });


  }
  // getcompanydropdowndata(){
  //   this.getcompanydata()
  // }
  addmaterialreceipt() {
    this.addItemsData = true;
    this.mainInputs = false
  }
  backTomainInputs() {
    this.addItemsData = false;
    this.mainInputs = true
  }

  closemodel() {
    this.dialog.closeAll()
  }
  saveaddeddata(form: any) {
    this.model['material_code'] = this.materialCODE
    this.model['material_description'] = this.materialNAME
    console.log(this.model);

    // this.editDATAA=true;
    this.saveddataarray.push(this.model)
    console.log(this.saveddataarray);
    this.SUM = 0

    this.saveddataarray.forEach((el: any) => {
      this.SUM += el.basicprice || el.basic_price
    })
    console.log(this.SUM);

    this.dataSource.data = this.saveddataarray
    console.log(this.dataSource.data)
    this.model = {}
    this.dialog.closeAll()



  }
  savefinaldata() {
    if (this.btn == "Save") {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1)
        this.matCode.push(ele.material_code)
        this.matName.push(ele.material_description)
        this.UOM.push(ele.uom || ele.unit_of_measurment)
        this.storageLocation.push(ele.storagelocation || ele.storage_location)
        this.valutionType.push(ele.valutiontype || ele.valuation_type)
        this.InvoiceQuantity.push(Number(ele.invqty || ele.invoice_quantity) || 0)
        this.RecQTY.push(Number(ele.recqty || ele.received_quantity) || 0)
        this.shrQTY.push(ele.shrtqty || ele.shortage_quantity || 0)
        this.excsQTY.push(ele.excsqty || ele.excess_quantity || 0)
        this.unitPrice.push(Number(ele.unitprice || ele.unit_price) || 0)
        this.discPERCENT.push(Number(ele.dispercentage || ele.discount_percent) || 0)
        this.discVALUE.push(ele.disvalue || ele.discount_value || 0)
        this.basicPRICE.push(ele.basicprice || ele.basic_price || 0)
        this.taxDESC.push(ele.taxdescription || ele.tax_description)
        this.taxPERCEN.push(ele.taxpercentage || ele.tax_percent || 0)
        this.taxVALUE.push(ele.taxvalue || ele.tax_value || 0)
        this.otherTAXSPLIT.push(ele.othertaxsplit || ele.other_tax_split)
        // this.POID.push(ele.po_id)
      }
      )
      this.saveddataarray.forEach((ele: any) => {
        this.freightSPLIT.push((ele.basicprice / this.SUM) * this.model1.totalfreight || ele.freight_split || 0)
        this.otherchargesSPLIT.push((ele.basicprice / this.SUM) * this.model1.otherchargesval || ele.other_charges_split || 0)
        this.othertaxSPLIT.push((ele.basicprice / this.SUM) * this.model1.othertaxvalue || ele.other_tax_split || 0)
        this.totalPRICE.push((+ele.basicprice + ele.taxvalue + ((ele.basicprice / this.SUM) * this.model1.totalfreight) +
          ((ele.basicprice / this.SUM) * this.model1.otherchargesval) +
          ((ele.basicprice / this.SUM) * this.model1.othertaxvalue)) || ele.total_price || 0)
      })

      let obj = {
        "comments": this.model1.comments,

        "date": moment(this.model1.dateee).format("YYYY-MM-DD"),
        "purchase_order_number": this.model1.ponumber,

        "purchase_order_date": moment(this.model1.podate).format("YYYY-MM-DD"),

        "company_name": this.model1.companyname,

        "vendor_name": this.model1.vendorname,

        "invoice_number": this.model1.invoicenumber,

        "invoice_date": moment(this.model1.invdate).format("YYYY-MM-DD"),

        "dc_number": this.model1.dcnumber,

        "dc_date": moment(this.model1.dcdate).format("YYYY-MM-DD"),

        "packing_details": this.model1.packdetails,

        "gate_entry_number": this.model1.genumber,

        "gate_entry_date": moment(this.model1.gedate).format("YYYY-MM-DD"),

        "transporter_name": this.model1.trsname,

        "vehicle_number": this.model1.vnumber,

        "lr_number": this.model1.irnumber,

        "lr_date": moment(this.model1.irdate).format("YYYY-MM-DD"),
        "line_item": this.SNO,

        "material_code": this.matCode,

        "material_description": this.matName,

        "unit_of_measurment": this.UOM,

        "storage_location": this.storageLocation,

        "invoice_quantity": this.InvoiceQuantity,

        "received_quantity": this.RecQTY || 0,

        "shortage_quantity": this.shrQTY || 0,

        "excess_quantity": this.excsQTY || 0,

        "unit_price": this.unitPrice || 0,

        "discount_percent": this.discPERCENT || 0,

        "discount_value": this.discVALUE || 0,
        "basic_price": this.basicPRICE || 0,

        "tax_description": this.taxDESC,

        "tax_percent": this.taxPERCEN || 0,

        "tax_value": this.taxVALUE || 0,

        "freight_split": this.freightSPLIT || 0,

        "basic_freight": Number(this.model1.basicfreight) || 0,

        "freight_tax_description": this.model1.frtaxdescription,

        "freight_tax_percent": Number(this.model1.frtaxpercentage) || 0,

        "freight_tax_value": this.model1.frtaxvalue || 0,

        "total_freight": this.model1.totalfreight || 0,

        "other_charges_description": this.model1.othercharges,

        "other_charges_value": Number(this.model1.otherchargesval) || 0,

        "other_charges_split": this.otherchargesSPLIT || 0,

        "other_tax_description": this.model1.othertaxdescription,

        "other_tax_percent": Number(this.model1.othertaxper) || 0,

        "other_tax_value": Number(this.model1.othertaxvalue) || 0,

        "other_tax_split": this.othertaxSPLIT || 0,

        "total_price": this.totalPRICE || 0,

        "quality_check": this.model1.qualitycheck,
        "way_bill_number": this.model1.waybillno,
        "valution_type": this.valutionType,
        "po_id": this.POID,
        "command": "add"
      }
      this.custservice.addmaterialreceiptdata(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          //  fr.reset();
          this.saveddataarray = []
          this.dataSource.data = []
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.InvoiceQuantity = []
          this.RecQTY = []
          this.shrQTY = []
          this.excsQTY = []
          this.unitPrice = []
          this.discPERCENT = []
          this.discVALUE = []
          this.basicPRICE = []
          this.taxDESC = []
          this.taxPERCEN = []
          this.taxVALUE = []
          this.otherTAXSPLIT = []
          this.freightSPLIT = []
          this.otherchargesSPLIT = []
          this.othertaxSPLIT = []
          this.totalPRICE = []
          this.valutionType = []
          this.POID = []
          this.model1 = {}
          this.generateddmr = res['reference']
          this.getData()
          this.getlogdata()
          if (this.fileUploadUrlsdmr.length > 0) {
            this.uploadedselctedfiles()
          }
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.InvoiceQuantity = []
          this.RecQTY = []
          this.shrQTY = []
          this.excsQTY = []
          this.unitPrice = []
          this.discPERCENT = []
          this.discVALUE = []
          this.basicPRICE = []
          this.taxDESC = []
          this.taxPERCEN = []
          this.taxVALUE = []
          this.otherTAXSPLIT = []
          this.freightSPLIT = []
          this.otherchargesSPLIT = []
          this.othertaxSPLIT = []
          this.totalPRICE = []
          this.valutionType = []
          // this.POID=[]
        }
      })
    } else {
      console.log(this.saveddataarray);
      this.saveddataarray.forEach((ele: any, index) => {
        this.SNO.push(index + 1)
        this.matCode.push(ele.material_code)
        this.matName.push(ele.material_description)
        this.UOM.push(ele.uom || ele.unit_of_measurment)
        this.storageLocation.push(ele.storagelocation || ele.storage_location)
        this.valutionType.push(ele.valutiontype || ele.valuation_type)
        this.InvoiceQuantity.push(Number(ele.invqty || ele.invoice_quantity) || 0)
        this.RecQTY.push(Number(ele.recqty || ele.received_quantity) || 0)
        this.shrQTY.push(ele.shrtqty || ele.shortage_quantity || 0)
        this.excsQTY.push(ele.excsqty || ele.excess_quantity || 0)
        this.unitPrice.push(Number(ele.unitprice || ele.unit_price) || 0)
        this.discPERCENT.push(Number(ele.dispercentage || ele.discount_percent) || 0)
        this.discVALUE.push(ele.disvalue || ele.discount_value || 0)
        this.basicPRICE.push(ele.basicprice || ele.basic_price || 0)
        this.taxDESC.push(ele.taxdescription || ele.tax_description)
        this.taxPERCEN.push(ele.taxpercentage || ele.tax_percent || 0)
        this.taxVALUE.push(ele.taxvalue || ele.tax_value || 0)
        this.otherTAXSPLIT.push(ele.othertaxsplit || ele.other_tax_split)
        // this.POID.push(ele.po_id)
      }
      )
      this.saveddataarray.forEach((ele: any) => {
        this.freightSPLIT.push((ele.basicprice / this.SUM) * this.model1.totalfreight || ele.freight_split || 0)
        this.otherchargesSPLIT.push((ele.basicprice / this.SUM) * this.model1.otherchargesval || ele.other_charges_split || 0)
        this.othertaxSPLIT.push((ele.basicprice / this.SUM) * this.model1.othertaxvalue || ele.other_tax_split || 0)
        this.totalPRICE.push((+ele.basicprice + ele.taxvalue + ((ele.basicprice / this.SUM) * this.model1.totalfreight) +
          ((ele.basicprice / this.SUM) * this.model1.otherchargesval) +
          ((ele.basicprice / this.SUM) * this.model1.othertaxvalue)) || ele.total_price || 0)
      })

      let obj = {
        "reason": this.editModel.reason,
        "comments": this.model1.comments,

        "date": moment(this.model1.dateee).format("YYYY-MM-DD"),
        "purchase_order_number": this.model1.ponumber,

        "purchase_order_date": moment(this.model1.podate).format("YYYY-MM-DD"),

        "company_name": this.model1.companyname,

        "vendor_name": this.model1.vendorname,

        "invoice_number": this.model1.invoicenumber,

        "invoice_date": moment(this.model1.invdate).format("YYYY-MM-DD"),

        "dc_number": this.model1.dcnumber,

        "dc_date": moment(this.model1.dcdate).format("YYYY-MM-DD"),

        "packing_details": this.model1.packdetails,

        "gate_entry_number": this.model1.genumber,

        "gate_entry_date": moment(this.model1.gedate).format("YYYY-MM-DD"),

        "transporter_name": this.model1.trsname,

        "vehicle_number": this.model1.vnumber,

        "lr_number": this.model1.irnumber,

        "lr_date": moment(this.model1.irdate).format("YYYY-MM-DD"),
        "line_item": this.SNO,

        "material_code": this.matCode,

        "material_description": this.matName,

        "unit_of_measurment": this.UOM,

        "storage_location": this.storageLocation,

        "invoice_quantity": this.InvoiceQuantity,

        "received_quantity": this.RecQTY || 0,

        "shortage_quantity": this.shrQTY || 0,

        "excess_quantity": this.excsQTY || 0,

        "unit_price": this.unitPrice || 0,

        "discount_percent": this.discPERCENT || 0,

        "discount_value": this.discVALUE || 0,
        "basic_price": this.basicPRICE || 0,

        "tax_description": this.taxDESC,

        "tax_percent": this.taxPERCEN || 0,

        "tax_value": this.taxVALUE || 0,

        "freight_split": this.freightSPLIT || 0,

        "basic_freight": Number(this.model1.basicfreight) || 0,

        "freight_tax_description": this.model1.frtaxdescription,

        "freight_tax_percent": Number(this.model1.frtaxpercentage) || 0,

        "freight_tax_value": this.model1.frtaxvalue || 0,

        "total_freight": this.model1.totalfreight || 0,

        "other_charges_description": this.model1.othercharges,

        "other_charges_value": Number(this.model1.otherchargesval) || 0,

        "other_charges_split": this.otherchargesSPLIT || 0,

        "other_tax_description": this.model1.othertaxdescription,

        "other_tax_percent": Number(this.model1.othertaxper) || 0,

        "other_tax_value": Number(this.model1.othertaxvalue) || 0,

        "other_tax_split": this.othertaxSPLIT || 0,

        "total_price": this.totalPRICE || 0,

        "quality_check": this.model1.qualitycheck,
        "way_bill_number": this.model1.waybillno,
        "valution_type": this.valutionType,
        "po_id": this.POID,
        "number": this.editednumber,
        "command": "edt"
      }
      this.custservice.addmaterialreceiptdata(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          //  fr.reset();
          this.saveddataarray = []
          this.dataSource.data = []
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.InvoiceQuantity = []
          this.RecQTY = []
          this.shrQTY = []
          this.excsQTY = []
          this.unitPrice = []
          this.discPERCENT = []
          this.discVALUE = []
          this.basicPRICE = []
          this.taxDESC = []
          this.taxPERCEN = []
          this.taxVALUE = []
          this.otherTAXSPLIT = []
          this.freightSPLIT = []
          this.otherchargesSPLIT = []
          this.othertaxSPLIT = []
          this.totalPRICE = []
          this.valutionType = []
          this.POID = []
          this.model1 = {}
          this.generateddmr = this.editednumber
          this.getData()
          this.getlogdata()
          this.editModel.reason = ""
          if (this.fileUploadUrlsdmr.length > 0) {
            this.uploadedselctedfiles()
          }

        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.InvoiceQuantity = []
          this.RecQTY = []
          this.shrQTY = []
          this.excsQTY = []
          this.unitPrice = []
          this.discPERCENT = []
          this.discVALUE = []
          this.basicPRICE = []
          this.taxDESC = []
          this.taxPERCEN = []
          this.taxVALUE = []
          this.otherTAXSPLIT = []
          this.freightSPLIT = []
          this.otherchargesSPLIT = []
          this.othertaxSPLIT = []
          this.totalPRICE = []
          this.valutionType = []
          // this.POID=[]
        }
      })
    }
  }
  editdata(row1: any, index: any, data: any) {
    // this.editDATAA=false
    console.log(row1);
    // this.getmasterdata()
    // this.getstoragelocData()

    this.selectedIndex = this.saveddataarray.indexOf(row1)
    console.log(this.selectedIndex);
    //  this.dialog.open(data,{
    //   width:'1100px',
    //   height:'570px'
    // })
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1
      }
    });
    this.model.matcode = this.systemref || row1.matcode
    this.model.uom = row1.uom || row1.unit_of_measurment
    this.model.storagelocation = row1.storagelocation || row1.storage_location
    this.model.valutiontype = row1.valutiontype || row1.valuation_type
    this.model.invqty = row1.invqty || row1.invoice_quantity
    this.model.recqty = row1.recqty || row1.received_quantity
    this.model.shrtqty = row1.shrtqty || row1.shortage_quantity
    this.model.excsqty = row1.excsqty || row1.excess_quantity
    this.model.unitprice = row1.unitprice || row1.unit_price
    this.model.dispercentage = row1.dispercentage || row1.discount_percent
    this.model.disvalue = row1.disvalue || row1.discount_value
    this.model.basicprice = row1.basicprice || row1.basic_price
    this.model.taxdescription = row1.tax_description || row1.taxdescription
    this.model.taxpercentage = row1.tax_percent || row1.taxpercentage
    this.model.taxvalue = row1.taxvalue || row1.tax_value

    // this.getTaxlistdata()

  }
  saveaddededitdata(fr: any) {

    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2matcode = el.code
        this.materialCODE = el.code
        this.materialNAME = el.name
      }
    });
    this.model2['material_code'] = this.materialCODE
    this.model2['material_description'] = this.materialNAME
    this.saveddataarray.splice(this.selectedIndex, 1, this.model2);
    this.dataSource.data = this.saveddataarray
    console.log(this.dataSource.data);

    this.saveddataarray[this.selectedIndex].matcode = this.model2matcode
    this.SUM = 0
    // console.log(this.model2);
    this.saveddataarray.forEach((el: any) => {
      this.SUM += el.basicprice || el.basic_price
    })
    console.log(this.SUM);
    this.model2 = {}
    this.dialog.closeAll()
  }
  selectedmastereditgroup() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.model2.matcode) {
        this.model2.uom = el.uom_1
        this.materialCODE = el.code
        this.materialNAME = el.name
      }


    });
    console.log(this.model2matcode, this.model2matdes);
  }
  Invoicevalue(ev: any) {
    this.valuefrminv = ev.target.value
    this.model.shrtqty = this.valuefrminv - this.valuefrmrec
    this.model.excsqty = this.valuefrmrec - this.valuefrminv
    if (this.unitValue == 0) {
      this.model.basicprice = 0
    } else {
      this.model.basicprice = (this.valuefrmrec * this.unitValue) - this.model.disvalue
    }
    if (this.model.shrtqty < 0) {
      this.model.shrtqty = 0
    }
    if (this.model.excsqty < 0) {
      this.model.excsqty = 0
    }

  }
  Invoiceeditvalue(ev: any) {
    if (this.model2.invqty == '' && this.model2.recqty == '') {
      this.valuefrminvedit = ev.target.value
      this.model2.shrtqty = this.valuefrminvedit - this.valuefrmrecedit
      this.model2.excsqty = this.valuefrmrecedit - this.valuefrminvedit
    } else {
      this.model2.shrtqty = this.model2.invqty - this.model2.recqty
      this.model2.excsqty = this.model2.recqty - this.model2.invqty
    }


    if (this.model2.unitValue == '') {
      this.model2.basicprice = 0
    } else if (this.unitValueedit) {
      this.model2.basicprice = (this.model2.recqty * this.unitValueedit) - this.model2.disvalue
    }
    else {
      this.model2.basicprice = (this.model2.recqty * this.model2.unitprice) - this.model2.disvalue
    }
    if (this.model2.shrtqty < 0) {
      this.model2.shrtqty = 0
    }
    if (this.model2.excsqty < 0) {
      this.model2.excsqty = 0
    }
  }
  Receivevalueedit(ev1: any) {
    if (this.model2.invqty == '' && this.model2.recqty == '') {
      this.valuefrmrecedit = ev1.target.value;
      this.model2.shrtqty = this.valuefrminvedit - this.valuefrmrecedit
      this.model2.excsqty = this.valuefrmrecedit - this.valuefrminvedit
    } else {
      this.model2.shrtqty = this.model2.invqty - this.model2.recqty
      this.model2.excsqty = this.model2.recqty - this.model2.invqty
    }
    if (this.model2.unitValue == '') {
      this.model2.basicprice = 0
    } else if (this.unitValueedit) {
      this.model2.basicprice = (this.model2.recqty * this.unitValueedit) - this.model2.disvalue
    }
    else {
      this.model2.basicprice = (this.model2.recqty * this.model2.unitprice) - this.model2.disvalue
    }
    if (this.model2.shrtqty < 0) {
      this.model2.shrtqty = 0
    }
    if (this.model2.excsqty < 0) {
      this.model2.excsqty = 0
    }

  }
  Receivevalue(ev1: any) {
    this.valuefrmrec = ev1.target.value;
    this.model.shrtqty = this.valuefrminv - this.valuefrmrec
    this.model.excsqty = this.valuefrmrec - this.valuefrminv
    if (this.unitValue == 0) {
      this.model.basicprice = 0
    } else {
      this.model.basicprice = (this.valuefrmrec * this.unitValue) - this.model.disvalue
    }
    if (this.model.shrtqty < 0) {
      this.model.shrtqty = 0
    }
    if (this.model.excsqty < 0) {
      this.model.excsqty = 0
    }
  }
  selectedunitprice(ev: any) {
    this.unitValue = ev.target.value
    this.model.disvalue = this.valuefrmrec * this.unitValue * this.discValue * 0.01
    this.model.basicprice = (this.valuefrmrec * this.unitValue) - this.model.disvalue
    if (this.model.taxdescription) {
      this.selectedtax()
    }
  }
  selectedunitpriceedit(ev: any) {
    if (this.model2.unitValue == '' && this.unitValueedit == 0) {
      this.unitValueedit = ev.target.value
      this.model2.disvalue = this.valuefrmrecedit * this.unitValueedit * this.discValueedit * 0.01
      this.model2.basicprice = (this.valuefrmrecedit * this.unitValueedit) - this.model2.disvalue
    } else if (this.model2.unitValue) {
      this.model2.disvalue = this.model2.recqty * this.model2.unitValue * this.model2.disvalue * 0.01
      this.model2.basicprice = (this.model2.recqty * this.model2.unitValue) - this.model2.disvalue
    }
    if (this.unitValueedit) {
      this.model2.basicprice = (this.model2.recqty * this.unitValueedit) - this.model2.disvalue
    }
    else {
      this.model2.basicprice = (this.model2.recqty * this.model2.unitprice) - this.model2.disvalue
    }
    if (this.model2.taxdescription) {
      this.selectedtaxedit()
    }
  }
  selecteddiscountprice(ev: any) {
    this.discValue = ev.target.value
    this.model.disvalue = this.valuefrmrec * this.unitValue * this.discValue * 0.01
    this.model.basicprice = (this.valuefrmrec * this.unitValue) - this.model.disvalue
    if (this.model.taxdescription) {
      this.selectedtax()
    }
  }
  selecteddiscountpriceedit(ev: any) {

    if (this.model2.dispercentage == '' && this.discValueedit == 0) {
      this.discValueedit = ev.target.value
      this.model2.disvalue = this.valuefrmrecedit * this.unitValueedit * this.discValueedit * 0.01
      this.model2.basicprice = (this.valuefrmrecedit * this.unitValueedit) - this.model2.disvalue
    } else if (this.model2.dispercentage) {
      this.model2.disvalue = this.model2.recqty * this.model2.unitprice * this.model2.dispercentage * 0.01
      this.model2.basicprice = (this.model2.recqty * this.model2.unitprice) - this.model2.disvalue
    }
    if (this.discValueedit == 0) {
      this.model2.basicprice = (this.model2.recqty * this.model2.unitprice) - this.model2.disvalue
    }
    // if(this.discValueedit){
    //   this.model2.disvalue=this.model2.recqty*this.model2.unitprice*this.model2.dispercentage*0.01
    //   this.model2.basicprice=(this.model2.recqty*this.model2.unitprice)- this.model2.disvalue
    // }
    // else {
    //   this.model2.basicprice=(this.model2.recqty*this.model2.unitprice)- this.model2.disvalue
    // }
    if (this.model2.taxdescription) {
      this.selectedtaxedit()
    }
  }
  selectedtax() {

    // this.model.taxpercentage=this.model.taxdescription.percentage
    this.taxData.forEach((el: any) => {
      if (el.code == this.model.taxdescription) {
        this.model.taxpercentage = el.percentage
      }
    })
    if (this.valuefrminv == 0) {
      this.model.taxvalue = 0
      this.model.totalprice = 0
    } else {
      this.model.taxvalue = this.model.basicprice * this.model.taxpercentage * 0.01
      this.model.totalprice = this.model.basicprice + this.model.taxvalue
    }

  }
  selectedtaxedit() {
    this.taxData.forEach((el: any) => {
      if (el.code == this.model2.taxdescription) {
        this.editedtaxdescription = el.percentage
      }
    })
    this.model2.taxpercentage = this.editedtaxdescription
    //  this.taxPERCENTAGE=
    if (this.model2.taxpercentage) {
      this.model2.taxvalue = this.model2.basicprice * this.model2.taxpercentage * 0.01
      this.model2.totalprice = this.model2.basicprice + this.model2.taxvalue
    }

  }
  selectedbasicfreight(ev: any) {
    this.basicFreight = ev.target.value
    this.model1.frtaxvalue = this.basicFreight * this.freightPercentage * 0.01
    this.selectedfreighttax()
  }
  selectedbasicfreight1(ev: any) {
    this.basicFreight1 = ev.target.value
    this.editmodel.frtaxvalue = this.basicFreight1 * this.freightPercentage1 * 0.01
    this.selectedfreighttax1()
  }
  selectedfreighttax() {
    this.taxData.forEach((element: any) => {
      if (element.code == this.model1.frtaxdescription) {
        this.model1.frtaxpercentage = element.percentage
        this.model1.frtaxvalue = this.basicFreight * this.model1.frtaxpercentage * 0.01
        this.model1.totalfreight = +this.basicFreight + this.model1.frtaxvalue
      }
    });



  }
  selectedfreighttax1() {
    this.taxData.forEach((element: any) => {
      if (element.code == this.editmodel.frtaxdescription) {
        this.editmodel.frtaxpercentage = element.percentage
        this.editmodel.frtaxvalue = this.basicFreight1 * this.editmodel.frtaxpercentage * 0.01
        this.editmodel.totalfreight = +this.basicFreight1 + this.editmodel.frtaxvalue
      }
    });



  }
  selectedTAXDESC() {
    this.taxData.forEach((element: any) => {
      if (element.code == this.model1.othertaxdescription) {
        this.model1.othertaxper = element.percentage
        // this.model1.othertaxvalue=this.basicFreight1*this.editmodel.frtaxpercentage*0.01
        // this.editmodel.totalfreight= +this.basicFreight1+this.editmodel.frtaxvalue
      }
    });
  }
  selectedTAXDESC1() {
    this.taxData.forEach((element: any) => {
      if (element.code == this.editmodel.othertaxdescription) {
        this.editmodel.othertaxper = element.percentage
        // this.model1.othertaxvalue=this.basicFreight1*this.editmodel.frtaxpercentage*0.01
        // this.editmodel.totalfreight= +this.basicFreight1+this.editmodel.frtaxvalue
      }
    });
  }
  keyPressNumbers(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }
  getpurchaseorderDATA(ev: any) {
    console.log(ev.target.value);
    this.selectedponumber = ev.target.value
    if (this.selectedponumber.length > 2) {
      this.getpoData()
    }
    if (!this.selectedponumber) {
      this.getpoData()
    }
  }
  getpoData() {
    let obj = {
      "command": "por",
      // "lmt" : 100000,
      // "pid" : 1 ,
      "key": this.ponumber
    }
    this.custservice.getmattransnamedata(obj).subscribe((res: any) => {
      this.PODATA = res.data

    })
  }
  openpurchaseordermodel(data: any) {
    this.POID = []
    this.dialog.open(data, {
      width: '600px'
    })
    this.getpoData()
  }
  submitpono(fr: any) {
    this.editDATAA = false;

    let obj = {
      "command": "mat",
      "key": this.ponumber,
      "field": "number"
    }
    this.custservice.getpurchaseorderdata(obj).subscribe((res: any) => {
      this.poiddata = res.data
      res.data.forEach((ele: any) => {
        this.POID.push(ele.id)
      })
      console.log(this.POID);
      this.saveddataarray = res.data
      const newArrayOfObj = this.saveddataarray.map(({
        quantity: invoice_quantity,
        quantity: received_quantity,
        ...rest
      }) => ({
        invoice_quantity,
        received_quantity,
        ...rest
      }));
      // })
      console.log(newArrayOfObj);
      this.saveddataarray = newArrayOfObj
      this.dataSource.data = this.saveddataarray
      this.tabledata = res.data[0]
      this.model1.companyname = this.tabledata.company_name
      this.model1.dateee = moment(new Date()).format("YYYY-MM-DD")
      this.model1.ponumber = this.tabledata.number
      this.model1.podate = moment(this.tabledata.date).format("YYYY-MM-DD")
      this.model1.genumber = this.tabledata.gate_entry_number
      this.model1.invoicenumber = this.tabledata.invoice_number
      this.model1.dcnumber = this.tabledata.dc_number
      this.model1.vendorname = this.tabledata.vendor_name
      this.model1.packdetails = this.tabledata.packing_details
      this.model1.trsname = this.tabledata.transporter_name
      this.model1.vnumber = this.tabledata.vehicle_number
      this.model1.irnumber = this.tabledata.lr_number
      this.model1.basicfreight = this.tabledata.basic_freight
      this.model1.frtaxdescription = this.tabledata.freight_tax_description
      this.model1.frtaxpercentage = this.tabledata.freight_tax_percent
      this.model1.frtaxvalue = this.tabledata.freight_tax_value
      this.model1.totalfreight = this.tabledata.total_freight
      this.model1.othercharges = this.tabledata.other_charges_description
      this.model1.otherchargesval = this.tabledata.other_charges_value
      this.model1.othertaxdescription = this.tabledata.other_tax_description
      this.model1.othertaxper = this.tabledata.other_tax_percent
      this.model1.othertaxvalue = this.tabledata.other_tax_value
      this.model1.qualitycheck = this.tabledata.quality_check
      this.model1.comments = this.tabledata.comments
      this.model1.waybillno = this.tabledata.waybillno
      console.log(this.model1.vendorname);
      this.SUM = 0
      this.saveddataarray.forEach((el: any) => {
        this.SUM += el.basic_price
      })
      console.log(this.SUM);
      this.dialog.closeAll()
      this.ponumber = ''
      // this.copieddmr=''
      // this.model1.add({vendorname:this.editabledata.vendor_name})
    })

  }
  showContent(index: any) {
    this.selectedIndex = index;
    console.log(this.selectedIndex);

  }
  getGEN(ev: any) {
    console.log(ev.target.value);
    this.selectedgen = ev.target.value
    if (this.selectedgen.length > 2) {
      this.getgateentrynumberdata()
    }
    if (!this.selectedgen) {
      this.getgateentrynumberdata()
    }
  }
  getgateentrynumberdata() {
    let obj = {
      command: "gen",
      key: this.selectedgen || ""
    }
    this.custservice.addmaterialreceiptdata(obj).subscribe((res: any) => {
      this.GENDATA = res.data

    })
  }
  getselectedvalue() {
    let obj = {
      key: this.model1.genumber,
      field: "number",
      command: "mat",
    }
    this.custservice.getGateInwardData(obj).subscribe((res: any) => {
      console.log(res);
      this.model1.vnumber = res.data[0].vehicle_number
      this.model1.gedate = moment(res.data[0].date).format("YYYY-MM-DD")
    })
  }

}
