import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-qualitycheck2',
  templateUrl: './qualitycheck2.component.html',
  styleUrls: ['./qualitycheck2.component.scss']
})
export class Qualitycheck2Component implements OnInit {
  @ViewChild('remarks') remarks1: ElementRef;
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource()
  dataSourcemain = new MatTableDataSource();
  displayedColumns: any[] = [
    'sno',
    'material_code',
    'material_description',
    'unit_of_measurement',
    'qc_quantity',
    'accepted_quantity',
    'rejected_quantity',
    'action'

  ];
  displayedColumns1: any[] = [
    'sno',
    'qc_Number',
    'qc_date',
    'DMRNumber',
    'VendorName',
    'InvoiceNumber',
    // 'company_name',
    'po_number',
    'po_date',
    // 'approval_status',
    // 'ActiveStatus',
    'action'

  ];
  model1: any = {}
  model: any = {}
  model2: any = {}
  dmrDATA: any;
  materialRECEIPTDATA: any;
  materialcode: any;
  MATDATA: any;
  qcqty: any = 0
  recqty: any = 0
  accqty: any = 0
  materialCODE: any[] = []
  matDESCRIPTION: any[] = []
  UOM: any[] = []
  SNO: any[] = []
  QCQTY: any[] = []
  AcceptedQTY: any[] = []
  RejectedQTY: any[] = []
  remarks: any;
  REMARKS: any[] = []
  qcQuantity: any;
  itemremarks: any;
  pageIndex: any = 1;
  pageSize: any = 10;
  reaData: boolean;
  totalRecords: any = 0
  loadingRecords: any = false;
  deletedItem: any;
  finalarray: any[] = []
  selectedIndex: any = -1
  QC_QTY: any[] = []
  ACC_QTY: any[] = []
  REJ_QTY: any[] = []
  ITEMREMARKS: any[] = []
  selecteddmr1: any;
  dialogRef: any = null;
  qualitychecknumber: any;
  filedata: any;
  createNewFile: any = {}
  imageUrl = environment.base_url
  deleteid: any;
  fileUploadUrls: any[] = []
  fileUploadUrlsqc: any[] = []
  resultqcnumber: any;
  selectedfiles: any[] = []
  filenamearray: any[] = []
  editednumber: any;
  editdataa: any;
  demo1TabIndex: any = 0
  btn: any = "Save"
  initialdmr: any = true;
  editdmr: any = false;
  logdata: any;
  initialdata: any = false;
  deletemodel: any = {}
  searchData: any;
  columnname: any;
  constructor(public custservice: CustomerService, private dialog: MatDialog,
    private alertcall: AlertCallsService, private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.model1.dateee = moment(new Date()).format("YYYY-MM-DD")
    this.model1.podate = moment(new Date()).format("YYYY-MM-DD")
    // this.getMaterialdata()
    this.getdata()
    this.getlogdata()
  }
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.qualitychecknumber = row1.dmr_number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.qualitychecknumber,)
      .set("document_type", "Quality Check")
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
      .set("document_number", this.qualitychecknumber,)
      .set("document_type", "Quality Check")
      .set("id", this.deleteid)
    this.custservice.deletefiles(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", "File Deleted Successfully")
        this.getexistingfiles()
        this.dialogRef.close()
      } else {
        // this.alertcall.showWarning("Error",res['message'])
        Swal.fire({
          text: res['message'],
          title: res['reference'],
          icon: 'warning',
          // title: res['reference'],
          width: 500,
        });
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

    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type", "Quality Check");
    postData.append("document_number", this.qualitychecknumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }
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
  uploadqcfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsqc = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrlsqc) {
        this.filenamearray.push(file.name)
        this.selectedfiles.push(file)
      }
    }

  }
  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Quality Check");
    postData.append("document_number", this.resultqcnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {

        this.fileUploadUrls = []
        this.selectedfiles = []
        this.filenamearray = []
      } else {

      }
    })
  }
  keyup() {
    this.getMaterialdata()
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getdata()
  }
  getdata() {
    let obj = {
      "command": "lst",
      "pid": this.pageIndex,
      "lmt": this.pageSize,
    }
    this.custservice.getQualityCheck2(obj).subscribe((res: any) => {
      console.log(res.data);
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
  }
  deleteItem(data: any, rw: any) {
    this.deletedItem = data.number
    this.dialog.open(rw, {
      width: '400px'
    })
  }
  deleteFile() {
    let obj = {
      "command": "del",
      "number": this.deletedItem,
      "reason": this.deletemodel.reason
    }
    this.custservice.deleteQualityCheck2(obj).subscribe((res: any) => {
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);

        this.dialog.closeAll()
        this.deletemodel.reason = ""
        this.getdata()
        this.getlogdata()
      } else {
        this.alertcall.showWarning('Accepted', res['message']);
      }
    })
  }
  getMaterialdata() {
    let obj = {
      "command": "dmr",
      // "lmt" : 100000,
      // "pid" : 1,
      // "key" : this.selecteddmr1
    }
    this.custservice.getQualityCheckdmrdata2(obj).subscribe((res: any) => {
      this.dmrDATA = res.data

    })
  }
  selecteddmr() {
    console.log(this.model1.dmrnumber);
    let obj = {
      command: "mat",
      key: this.model1.dmrnumber,
      field: "number"
    }
    this.custservice.getmaterialreceiptdata(obj).subscribe((res: any) => {
      console.log(res);
      this.MATDATA = res.data
      this.materialRECEIPTDATA = res.data[0]
      this.model1.ponumber = this.materialRECEIPTDATA.purchase_order_number
      this.model1.podate = moment(this.materialRECEIPTDATA.purchase_order_date).format("YYYY-MM-DD");
      // this.model1.companyname=this.materialRECEIPTDATA.company_name
      this.model1.vendorname = this.materialRECEIPTDATA.vendor_name
      this.model1.invoicenumber = this.materialRECEIPTDATA.invoice_number
      this.materialcode = this.materialRECEIPTDATA.material_code
    })
  }
  selectedqcqty(ev: any) {
    this.qcqty = ev.target.value


  }
  selectedaccqty(ev: any, data: any) {
    console.log(data);
    this.accqty = ev.target.value
    if (this.accqty > ((this.qcqty || data) - this.recqty)) {
      console.log((this.qcqty || data) - this.recqty);

      this.alertcall.showWarning("Accepted", "Accepted Qty Exceed The Limit")
    }
    //  this.qcQuantity=data
  }
  selectedrecqty(ev: any, data: any) {
    this.recqty = ev.target.value
    if (this.recqty > ((this.qcqty || data) - this.accqty)) {
      this.alertcall.showWarning("Accepted", "Rejected Qty Exceeds The Limit")
    }

  }
  selectedremarks(ev: any, index: any) {
    this.selectedIndex = index

    this.REMARKS.push(ev.target.value)
    console.log(this.REMARKS);


  }
  // savetabledata(){
  //   const b1: HTMLElement = window.document.getElementById("myTable")!
  //   b1?.addEventListener('click', (e: Event) => {
  //     // Do stuff.
  //     console.log(e);
  //   });
  //   // var b2=b1.rows.length
  //   // console.log(b1,b2);

  // }
  deleterowItem(index: any) {
    this.MATDATA.splice(index, 1)
  }
  savefinaldata(fr: any) {

    if (this.btn === "Save") {
      this.MATDATA.forEach((element: any, index: any) => {
        // if(this.MATDATA[index].accepted_quantity>(this.MATDATA[index].received_quantity-this.MATDATA[index].rejeted_quantity)){
        //   // console.log((this.qcqty||data)-this.recqty);

        //   this.alertcall.showWarning("Accepted","Accepted Qty Exceed The Limit")
        // }
        // if(this.MATDATA[index].rejeted_quantity>(this.MATDATA[index].received_quantity-this.MATDATA[index].accepted_quantity)){
        //   this.alertcall.showWarning("Accepted","Rejected Qty Exceeds The Limit")
        // }
        this.QC_QTY.push(Number(element.received_quantity))
        this.ACC_QTY.push(Number(element.accepted_quantity))
        this.REJ_QTY.push(Number(element.rejeted_quantity))
        this.ITEMREMARKS.push(element.item_remarks)
      });

      this.MATDATA.forEach((element: any, index: any) => {
        this.materialCODE.push(element.material_code)
        this.matDESCRIPTION.push(element.material_description)
        this.UOM.push(element.unit_of_measurment)
        this.SNO.push(element.line_item)
        //   this.QCQTY.push(this.qcQuantity)
        // this.AcceptedQTY.push(this.accqty)
        // this.RejectedQTY.push(this.recqty)

      });

      let obj = {
        // "number": "GEPPL/22-23/QC/009",     
        "dmr_number": this.model1.dmrnumber,
        "comments": this.model1.comments,
        "date": moment(this.model1.dateee).format("YYYY-MM-DD"),
        "purchase_order_number": this.model1.ponumber,
        "purchase_order_date": this.model1.podate,
        // "company_name": this.model1.companyname, 
        "vendor_name": this.model1.vendorname,
        "invoice_number": this.model1.invoicenumber,
        "line_item": this.SNO,
        "item_remarks": this.ITEMREMARKS,
        "material_code": this.materialCODE,

        "material_description": this.matDESCRIPTION,

        "unit_of_measurment": this.UOM,

        "qc_quantity": this.QC_QTY,

        "accepted_quantity": this.ACC_QTY,
        "rejeted_quantity": this.REJ_QTY,
        "command": "add"
      }
      this.custservice.addQualityCheck2(obj).subscribe((res: any) => {
        console.log(res);
        if (res && res['status_code'] == '200') {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          this.MATDATA = null
          fr.reset()
          this.QC_QTY = []
          this.ACC_QTY = []
          this.REJ_QTY = []
          this.ITEMREMARKS = []
          this.materialCODE = []
          this.matDESCRIPTION = []
          this.UOM = []
          this.SNO = []
          this.model1.ponumber = null
          this.model1.podate = null
          // this.model1.companyname=null
          this.model1.vendorname = null
          this.model1.invoicenumber = null
          this.materialcode = null
          this.model1.dmrnumber = null
          this.getdata()
          this.getlogdata()
          this.resultqcnumber = res['reference']
          if (this.fileUploadUrlsqc.length > 0) {
            this.uploadselectedfiles()
          }
        } else {
          // this.alertcall.showWarning('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'warning',
            // title: res['reference'],
            width: 500,
          });
          this.QC_QTY = []
          this.ACC_QTY = []
          this.REJ_QTY = []
          this.ITEMREMARKS = []
          this.materialCODE = []
          this.matDESCRIPTION = []
          this.UOM = []
          this.SNO = []
          // this.model1.ponumber=''
          // this.model1.podate=''
          // this.model1.companyname=''
          // this.model1.vendorname=''
          // this.model1.invoicenumber=''
          // this.materialcode=''
        }

      })
    } else {
      this.MATDATA.forEach((element: any, index: any) => {

        this.QC_QTY.push(Number(element.received_quantity))
        this.ACC_QTY.push(Number(element.accepted_quantity))
        this.REJ_QTY.push(Number(element.rejeted_quantity))
        this.ITEMREMARKS.push(element.item_remarks)
      });

      this.MATDATA.forEach((element: any, index: any) => {
        this.materialCODE.push(element.material_code)
        this.matDESCRIPTION.push(element.material_description)
        this.UOM.push(element.unit_of_measurment)
        this.SNO.push(element.line_item)


      });

      let obj = {
        "number": this.editednumber,
        "dmr_number": this.model1.dmrnumber,
        "comments": this.model1.comments,
        "date": moment(this.model1.dateee).format("YYYY-MM-DD"),
        "purchase_order_number": this.model1.ponumber,
        "purchase_order_date": this.model1.podate,
        // "company_name": this.model1.companyname, 
        "vendor_name": this.model1.vendorname,
        "invoice_number": this.model1.invoicenumber,
        "line_item": this.SNO,
        "item_remarks": this.ITEMREMARKS,
        "material_code": this.materialCODE,

        "material_description": this.matDESCRIPTION,

        "unit_of_measurment": this.UOM,

        "qc_quantity": this.QC_QTY,

        "accepted_quantity": this.ACC_QTY,
        "rejeted_quantity": this.REJ_QTY,
        "command": "edt"
      }
      this.custservice.addQualityCheck2(obj).subscribe((res: any) => {
        console.log(res);
        if (res && res['status_code'] == '200') {
          // this.alertcall.showSuccess('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          this.MATDATA = null
          fr.reset()
          this.QC_QTY = []
          this.ACC_QTY = []
          this.REJ_QTY = []
          this.ITEMREMARKS = []
          this.materialCODE = []
          this.matDESCRIPTION = []
          this.UOM = []
          this.SNO = []
          this.model1.ponumber = null
          this.model1.podate = null
          // this.model1.companyname=null
          this.model1.vendorname = null
          this.model1.invoicenumber = null
          this.materialcode = null
          this.model1.dmrnumber = null
          this.getdata()
          this.getlogdata()
          this.resultqcnumber = this.editednumber
          if (this.fileUploadUrlsqc.length > 0) {
            this.uploadselectedfiles()
          }
          this.logdata = ""
        } else {
          // this.alertcall.showWarning('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'warning',
            // title: res['reference'],
            width: 500,
          });
          this.QC_QTY = []
          this.ACC_QTY = []
          this.REJ_QTY = []
          this.ITEMREMARKS = []
          this.materialCODE = []
          this.matDESCRIPTION = []
          this.UOM = []
          this.SNO = []

        }

      })
    }
  }
  getdmrDATA(ev: any) {
    console.log(ev.target.value);
    this.selecteddmr1 = ev.target.value
    if (this.selecteddmr1.length > 2) {
      this.getMaterialdata()
    }
  }
  editdata(data: any) {
    this.initialdmr = false;
    this.editdmr = true;
    this.editednumber = data.number
    let obj = {
      command: "mat",
      number: data.number,
      // id:410
      // field: "number",
      // key: data.number
    }
    this.custservice.addQualityCheck2(obj).subscribe((res: any) => {
      // this.logdata=res.log
      this.editdataa = res.data[0]
      this.MATDATA = res.data
      this.model1.dmrnumber = this.editdataa.dmr_number,
        this.model1.comments = this.editdataa.comments,
        this.model1.dateee = moment(this.editdataa.date).format("YYYY-MM-DD"),
        this.model1.ponumber = this.editdataa.purchase_order_number,
        this.model1.podate = moment(this.editdataa.purchase_order_date).format("YYYY-MM-DD"),
        // this.model1.companyname=this.editdataa.company_name, 
        this.model1.vendorname = this.editdataa.vendor_name,
        this.model1.invoicenumber = this.editdataa.invoice_number,

        this.demo1TabIndex = 0;
      this.initialdata = true;
    })
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "QualityCheck2"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      this.logdata = res.log
    })
  }
  openactivitylog(data: any) {
    this.dialog.open(data, {
      width: '900px'
    })
  }
  onChange() {
    console.log('Selected:', this.columnname);
    this.searchData = ""
    // this.searchData=this.columnname
    // let selectedColumn=this.searchData
  }
  search() {
    console.log(this.searchData);
    let obj = { "command": "lst", "field": this.columnname, "key": this.searchData, "lmt": this.pageSize, "pid": this.pageIndex }
    if (this.searchData.length > 2) {
      this.custservice.getSearchQualityCheck2(obj).subscribe((res: any) => {
        console.log(res.data);
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourcemain.data = res.data
        this.dataSourcemain = new MatTableDataSource(res.data);
        if (res.data.length == 0) {
          this.reaData = true
        }
      })
    } else if (!this.searchData) {
      this.getdata()
      this.columnname = ""
    }
  }
}
