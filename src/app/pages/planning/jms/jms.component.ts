import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import Swal from 'sweetalert2';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-jms',
  templateUrl: './jms.component.html',
  styleUrls: ['./jms.component.scss']
})
export class JmsComponent implements OnInit {
  description1: any;
  isCheckedMap: any = {};
  jmsnumber: any;
  filedata: any;
  deleteid: any;
  dialogRef: any = null;
  resultjmsnumber: any;
  editednumber: any;
  logdata: any;
  editdataa: any;
  editModel: any = {}
  deletemodel: any = {}
  UOM: any;
  balanceqty: any;
  UOMdata: any;
  LENGTH: any;
  WIDTH: any;
  HEIGHT: any;
  constructor(
    private dialog: MatDialog,
    private custservice: CustomerService,
    private alertcall: AlertCallsService, public overlay: Overlay, private injector: Injector,
    private router: Router, private route: ActivatedRoute) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  dataSource = new MatTableDataSource();
  dataSourceList = new MatTableDataSource();
  dataSourcemain = new MatTableDataSource();


  displayedColumns: any[] = [
    'lineItem', 'description', 'uom', 'count', 'length', 'height', 'width', 'quantity', 'itemremarks', 'action'
  ]

  displayedColumnsList: any[] = [
    'sno', 'number', 'boqdesc', 'isactive', 'totalquantity', 'action'
  ]

  displayedColumnsMain: any[] = [
    'lineItem', 'description', 'quantity', 'balance_quantity', 'select'
  ]

  formdata: any = {}
  formdatamain: any = {}
  workordermain: any
  workorder: any;
  boqid: any;
  dialogdata: any = {}
  editdialogdata: any = {}
  description: any;
  uom: any;
  quantity: any;
  length: any;
  breadth: any;
  height: any;
  width: any;
  itemdescription: any;
  itemremarks: any
  dialogdataArray: any[] = []
  finaldataArray: any[] = []
  selectedIndex: any;
  reaData: boolean;
  pageSize: any = 10;
  pageIndex: any = 1;
  totalRecords: any;
  deleteNumber: any;
  Description: any[] = []
  unit_of_measurment: any[] = []
  Quantity: any[] = []
  Length: any[] = []
  Width: any[] = []
  Height: any[] = []
  item_remarks: any[] = []
  boq_item_description: any[] = []
  servicemasterData: any
  selectedservicemaster: any
  editselectedservicemaster: any
  WOlist: any
  WOLIST: any
  selectedwo: any
  wonumbermain: any
  tabledata: any[] = []
  wonumbertable: any
  boqitemdescription: any
  boq_id: any
  Count: any[] = []
  initialdata: any = true;
  secondarydata: any = false;
  imageUrl = environment.base_url
  fileUploadUrls: any[] = []
  fileUploadUrlsjms: any[] = []
  selectedfiles: any[] = []
  filenamearray: any[] = []
  filenamearray1: any[] = []
  demo1TabIndex: any = 0
  btn: any = "Save"
  COUNT: any = 0;
  inputlength: any = 0;
  inputheight: any = 0;
  inputwidth: any = 0;
  COUNTedit: any = 0;
  inputlengthedit: any = 0;
  inputheightedit: any = 0;
  inputwidthedit: any = 0;
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    console.log(row1);

    this.jmsnumber = row1.work_order_number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.jmsnumber,)
      .set("document_type", "Joint Measurement Sheet")
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
    this.custservice.getexistingfies(params).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filedata = res.data

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
      .set("document_number", this.jmsnumber,)
      .set("document_type", "Joint Measurement Sheet")
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
      for (const file of this.fileUploadUrls) {
        this.filenamearray.push(file.name)
      }
    }
    const postData = new FormData();
    postData.append("document_type", "Joint Measurement Sheet");
    postData.append("document_number", this.jmsnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.fileUploadUrls = []
        this.filenamearray = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }
  uploadjmsfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsjms = fileInput.target.files;
      for (const file of this.fileUploadUrlsjms) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }


    }

  }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Joint Measurement Sheet");
    postData.append("document_number", this.resultjmsnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }


    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.fileUploadUrlsjms = []
        this.selectedfiles = []
        this.filenamearray1 = []
      } else {

      }
    })
  }
  deletejmadata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px',
      // scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.boq_id;
    console.log(this.deleteNumber)
    console.log(rw, data)
  }
  selectedrow(data: any) {
    console.log(data);

    this.wonumbertable = data.wo_number
    this.description1 = data.item_description
    this.UOM = data.unit_of_measurment
    this.balanceqty = data.balance_quantity
    this.boq_id = data.id
    this.initialdata = false;
    this.secondarydata = true;
  }
  backtoprevious() {
    this.initialdata = true;
    this.secondarydata = false;
  }
  addjmsdata(data: any) {
    this.dialogdata.quantity = ""
    this.dialog.open(data, {
      width: '1000px'
    })
    this.dialogdata.uom = this.UOM
    this.UOMdata.forEach((element: any) => {
      if (element.code === this.UOM) {
        this.LENGTH = element.length
        this.WIDTH = element.width
        this.HEIGHT = element.height
        console.log(this.LENGTH, this.WIDTH, this.HEIGHT);

      }
    });
  }
  getqtydata(ev: any) {
    this.COUNT = ev.target.value
    this.getotalqty()
  }
  getqtydatalength(ev: any) {
    this.inputlength = ev.target.value;
    this.getotalqty()
  }
  getqtydataheight(ev: any) {
    this.inputheight = ev.target.value;
    this.getotalqty()
  }
  getqtydatawidth(ev: any) {
    this.inputwidth = ev.target.value;
    this.getotalqty()
  }
  getotalqty() {
    if (this.inputwidth == 0 && this.COUNT == 0 && this.inputlength == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = 0
      console.log(this.dialogdata.quantity);

    }
    else if (this.inputwidth == 0 && this.COUNT == 0) {
      this.dialogdata.quantity = this.inputlength * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputlength == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputwidth
      console.log(this.dialogdata.quantity);
    }
    else if (this.COUNT == 0 && this.inputlength == 0) {
      this.dialogdata.quantity = this.inputwidth * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputlength == 0 && this.inputwidth == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.COUNT == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = this.inputlength * this.inputwidth
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputwidth == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputlength
      console.log(this.dialogdata.quantity);

    }
    else if (this.inputwidth == 0 && this.inputlength == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputheight == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputlength * this.inputwidth
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputlength == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputwidth * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.COUNT == 0) {
      this.dialogdata.quantity = this.inputlength * this.inputwidth * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputwidth == 0) {
      this.dialogdata.quantity = this.COUNT * this.inputlength * this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputwidth == 0 && this.COUNT == 0 && this.inputlength == 0) {
      this.dialogdata.quantity = this.inputheight
      console.log(this.dialogdata.quantity);
    }
    else if (this.COUNT == 0 && this.inputlength == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = this.inputwidth
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputwidth == 0 && this.inputlength == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = this.COUNT
      console.log(this.dialogdata.quantity);
    }
    else if (this.inputwidth == 0 && this.COUNT == 0 && this.inputheight == 0) {
      this.dialogdata.quantity = this.inputlength
      console.log(this.dialogdata.quantity);
    }
    else {
      this.dialogdata.quantity = this.COUNT * this.inputlength * this.inputwidth * this.inputheight
      console.log(this.dialogdata.quantity);
    }
  }
  getunitData() {
    let obj = {
      "command": "lst",

    }
    this.custservice.getunitdata(obj).subscribe((res: any) => {
      this.UOMdata = res.data
    })
  }
  closedialogdata() {
    this.dialog.closeAll();

  }
  binddatatotable(fr: any) {
    console.log(this.dialogdata);
    this.dialogdataArray.push(this.dialogdata)
    //this.finaldataArray.push(this.dialogdata)
    this.dataSource.data = this.dialogdataArray
    this.dialog.closeAll()
    this.dialogdata = {}
    this.COUNT = 0
    this.inputlength = 0
    this.inputheight = 0
    this.inputwidth = 0
  }

  editjmsData(row1: any, index: any, data: any) {
    console.log(row1)
    this.selectedIndex = this.dialogdataArray.indexOf(row1)
    console.log(row1)
    this.dialog.open(data, {
      width: '1000px'
    })
    this.UOMdata.forEach((element: any) => {
      if (element.code === this.UOM) {
        this.LENGTH = element.length
        this.WIDTH = element.width
        this.HEIGHT = element.height
        console.log(this.LENGTH, this.WIDTH, this.HEIGHT);

      }
    });
    this.editdialogdata.count = row1.count
    this.editdialogdata.description = row1.description
    this.editdialogdata.uom = this.UOM || row1.unit_of_measurment
    this.editdialogdata.quantity = row1.quantity
    this.editdialogdata.length = row1.length
    this.editdialogdata.breadth = row1.breadth
    this.editdialogdata.height = row1.height
    this.editdialogdata.width = row1.width
    this.editdialogdata.boqitemdescription = row1.boqitemdescription
    this.editdialogdata.itemremarks = row1.itemremarks || row1.item_remarks
  }
  getqtydataedit(ev: any) {
    this.COUNTedit = ev.target.value
    this.getotalqtyedit()
  }
  getqtydatalengthedit(ev: any) {
    this.inputlengthedit = ev.target.value;
    this.getotalqtyedit()
  }
  getqtydataheightedit(ev: any) {
    this.inputheightedit = ev.target.value;
    this.getotalqtyedit()
  }
  getqtydatawidthedit(ev: any) {
    this.inputwidthedit = ev.target.value;
    this.getotalqtyedit()
  }
  getotalqtyedit() {
    if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.count || this.COUNTedit) == 0 && (this.editdialogdata.length || this.inputlengthedit) == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = 0
      console.log(this.editdialogdata.quantity);

    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.count || this.COUNTedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.length || this.inputlengthedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.length || this.inputlengthedit) == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.width || this.inputwidthedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.count || this.COUNTedit) == 0 && (this.editdialogdata.length || this.inputlengthedit) == 0) {
      this.dialogdata.quantity = (this.editdialogdata.width || this.inputwidthedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.dialogdata.quantity);
    }
    else if ((this.editdialogdata.length || this.inputlengthedit) == 0 && (this.editdialogdata.width || this.inputwidthedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.count || this.COUNTedit) == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.length || this.inputlengthedit) * (this.editdialogdata.width || this.inputwidthedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.length || this.inputlengthedit)
      console.log(this.editdialogdata.quantity);

    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.length || this.inputlengthedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.length || this.inputlengthedit) * (this.editdialogdata.width || this.inputwidthedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.length || this.inputlengthedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.width || this.inputwidthedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.count || this.COUNTedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.length || this.inputlengthedit) * (this.editdialogdata.width || this.inputwidthedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.length || this.inputlengthedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.count || this.COUNTedit) == 0 && (this.editdialogdata.length || this.inputlengthedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.count || this.COUNTedit) == 0 && this.editdialogdata.length == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.width || this.inputwidthedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.length || this.inputlengthedit) == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit)
      console.log(this.editdialogdata.quantity);
    }
    else if ((this.editdialogdata.width || this.inputwidthedit) == 0 && (this.editdialogdata.count || this.COUNTedit) == 0 && (this.editdialogdata.height || this.inputheightedit) == 0) {
      this.editdialogdata.quantity = (this.editdialogdata.length || this.inputlengthedit)
      console.log(this.editdialogdata.quantity);
    }
    else {
      this.editdialogdata.quantity = (this.editdialogdata.count || this.COUNTedit) * (this.editdialogdata.length || this.inputlengthedit) * (this.editdialogdata.width || this.inputwidthedit) * (this.editdialogdata.height || this.inputheightedit)
      console.log(this.editdialogdata.quantity);
    }
  }
  editbindedDatatotable() {
    this.dialogdataArray.splice(this.selectedIndex, 1, this.editdialogdata);
    this.dataSource.data = this.dialogdataArray
    console.log(this.dataSource.data);
    this.editdialogdata = {}
    this.dialog.closeAll();
  }
  deleterowData(index: any) {
    console.log(index)
    this.dialogdataArray.splice(index, 1);
    this.dataSource.data = this.dialogdataArray
  }
  getjmslistdata() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex
    }
    this.custservice.getJMSlistdata(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.cnt;
      this.dataSourceList.data = res.message

    })
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getjmslistdata()
  }

  deleteItem() {
    let obj = {
      "command": "del",
      "boq_id": this.deleteNumber,
      "reason": this.deletemodel.reason
    }
    this.custservice.deleteJMSdata(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason = ""
        this.getjmslistdata()
        this.getlogdata()
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  }
  savefinaldata() {
    if (this.btn == "Save") {
      console.log(this.dialogdataArray);
      this.dialogdataArray.forEach((val: any) => {
        this.Description.push(val.description),
          this.unit_of_measurment.push(val.uom),
          this.Quantity.push(Number(val.quantity)),
          this.Length.push(Number(val.length)),
          this.Count.push(Number(val.count)),
          this.Height.push(Number(val.height) || 0)
        this.Width.push(Number(val.width))
        this.boq_item_description.push(val.boqitemdescription)
        this.item_remarks.push(val.itemremarks)
      })
      // this.tabledata.forEach((val:any)=>{
      //   this.boq_id = val.id
      // })
      let obj = {
        "command": "add",
        "work_order_number": this.wonumbermain,
        "boq_id": this.boq_id,
        "date": moment(this.formdata.date).format("YYYY-MM-DD"),
        "boq_item_description": this.description1,
        "description": this.Description,
        "unit_of_measurment": this.unit_of_measurment,
        "quantity": this.Quantity,
        "length": this.Length,
        "width": this.Width,
        "height": this.Height,
        "count": this.Count,
        "item_remarks": this.item_remarks
      }
      this.custservice.addJMSdata(obj).subscribe((res: any) => {
        console.log(obj)
        console.log(res)
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          // fr.reset();
          this.dialogdataArray = []
          this.Description = [],
            this.unit_of_measurment = [],
            this.Quantity = [],
            this.Length = [],
            this.Count = [],
            this.Height = []
          this.Width = []
          this.boq_item_description = []
          this.item_remarks = []
          this.dataSource.data = []
          this.formdata.date = ""
          this.backtoprevious()
          this.gettabledata()
          this.getlogdata()
          this.resultjmsnumber = res['reference']
          if (this.fileUploadUrlsjms.length > 0) {
            this.uploadedselctedfiles()
          }
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.Description = [],
            this.unit_of_measurment = [],
            this.Quantity = [],
            this.Length = [],
            this.Count = [],
            this.Height = []
          this.Width = []
          this.boq_item_description = []
          this.item_remarks = []
        }

      })
    } else {
      // console.log(this.unit_of_measurment);

      this.dialogdataArray.forEach((val: any) => {
        this.Description.push(val.description),
          this.unit_of_measurment.push(val.uom || val.unit_of_measurment),
          this.Quantity.push(Number(val.quantity)),
          this.Length.push(Number(val.length)),
          this.Count.push(Number(val.count)),
          this.Height.push(Number(val.height) || 0)
        this.Width.push(Number(val.width))
        this.boq_item_description.push(val.boqitemdescription)
        this.item_remarks.push(val.itemremarks || val.item_remarks)


      })

      let obj = {
        "reason": this.editModel.reason,
        "command": "edt",
        "number": this.editednumber,
        "work_order_number": this.wonumbermain,
        "boq_id": this.boq_id,
        "date": moment(this.formdata.date).format("YYYY-MM-DD"),
        "boq_item_description": this.description1,
        "description": this.Description,
        "unit_of_measurment": this.unit_of_measurment,
        "quantity": this.Quantity,
        "length": this.Length,
        "width": this.Width,
        "height": this.Height,
        "count": this.Count,
        "item_remarks": this.item_remarks
      }
      this.custservice.addJMSdata(obj).subscribe((res: any) => {
        console.log(obj)
        console.log(res)
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          // fr.reset();
          this.dialogdataArray = []
          this.Description = [],
            this.unit_of_measurment = [],
            this.Quantity = [],
            this.Length = [],
            this.Count = [],
            this.Height = []
          this.Width = []
          this.boq_item_description = []
          this.item_remarks = []
          this.dataSource.data = []
          this.formdata.date = ""
          this.backtoprevious()
          this.gettabledata()
          this.getlogdata()
          this.editModel.reason = ""
          this.resultjmsnumber = this.editednumber
          if (this.fileUploadUrlsjms.length > 0) {
            this.uploadedselctedfiles()
          }

        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.Description = [],
            this.unit_of_measurment = [],
            this.Quantity = [],
            this.Length = [],
            this.Count = [],
            this.Height = []
          this.Width = []
          this.boq_item_description = []
          this.item_remarks = []
        }

      })
    }
  }
  validateNumber(e: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = e.target.value + String.fromCharCode(e.charCode);

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }
  getsrvcMasterData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedservicemaster || this.editselectedservicemaster
    }
    this.custservice.getServiceMasterData(obj).subscribe((res: any) => {
      console.log(res.data)
      this.servicemasterData = res.data
      console.log(this.servicemasterData)

    })
  }
  filterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedservicemaster = ev.target.value
    if (this.selectedservicemaster.length > 2) {
      this.getsrvcMasterData()
    }
    if (!this.selectedservicemaster) {
      this.getsrvcMasterData()
    }
  }
  selectedserviceuom() {
    console.log(this.formdata.description)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.dialogdata.description) {
        // this.dialogdata.uom = ele.unit_of_measurment
        //this.formdata.servicecode = ele.code
      }
    });
  }
  editfilterdata(ev: any) {
    console.log(ev.target.value);
    this.editselectedservicemaster = ev.target.value
    if (this.editselectedservicemaster.length > 2) {
      this.getsrvcMasterData()
    }
    if (!this.editselectedservicemaster) {
      this.getsrvcMasterData()
    }
  }
  editselectedserviceuom() {
    console.log(this.formdata.description)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.dialogdata.description) {
        // this.dialogdata.uom = ele.unit_of_measurment
        //this.formdata.servicecode = ele.code
      }
    });
  }
  getworkorderlistData() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getWOlistData(obj).subscribe((res: any) => {
      console.log(res);
      this.WOlist = res.data
    })
  }

  getWOlistdata() {
    let obj = {
      "command": "wol"
    }
    this.custservice.getWOlist(obj).subscribe((res: any) => {
      console.log(res.message)
      this.WOLIST = res.message
    })
  }
  filterdatawo(ev: any) {
    console.log(ev.target.value);
    this.selectedwo = ev.target.value
    if (this.selectedwo.length > 2) {
      this.getWOlistdata()
    }
    if (!this.selectedwo) {
      this.getWOlistdata()
    }
  }
  selectedWO() {
    this.gettabledata();


  }
  gettabledata() {
    let obj = {
      "command": "set",
      "wo_number": this.wonumbermain
    }
    this.custservice.getTABLEdata(obj).subscribe((res: any) => {
      console.log(obj)
      console.log(res.message)
      this.tabledata = (res.message)
      this.LENGTH = true;
      this.WIDTH = true;
      this.HEIGHT = true

    })
  }

  ngOnInit(): void {
    this.formdata.date = moment(new Date()).format("YYYY-MM-DD")
    this.getjmslistdata();
    this.getsrvcMasterData();
    this.getworkorderlistData();
    this.getWOlistdata();
    this.getlogdata()
    this.getunitData()
    this.route.queryParams.subscribe((params: any) => {

      if (params.tab == 'notifications') {
        this.demo1TabIndex = 1;
        console.log(params);

      }
      else {
        this.demo1TabIndex = 0;
      }
    })
  }
  printJMS(data: any) {
    console.log(data.number);
    this.router.navigate(['/planning/printjms'], { queryParams: { 'wonumber': data.work_order_number } })
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "JoinMeasurementSheet"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
    })
  }
  editJMSdata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.editednumber = data.work_order_number
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      field: "number",
      key: this.editednumber,
    }
    this.custservice.addJMSdata(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      this.editdataa = res.data[0]
      this.dialogdataArray = res.data
      this.dataSource.data = this.dialogdataArray
      this.wonumbertable = this.editdataa.work_order_number,
        this.boq_id = this.editdataa.boq_id,
        this.formdata.date = moment(this.editdataa.date).format("YYYY-MM-DD"),
        this.description1 = this.editdataa.boq_item_description,
        //  this.Description=this.editdataa.description,
        //  this.unit_of_measurment=this.editdataa.unit_of_measurment,
        //  this.Quantity=this.editdataa.quantity,
        //  this.Length=this.editdataa.length,
        //  this.Width=this.editdataa.width,
        // this.Height=this.editdataa.height,
        //  this.Breadth=this.editdataa.work_order_number,
        // this.item_remarks=this.editdataa.item_remarks

        this.demo1TabIndex = 0;
      this.initialdata = false;
      this.secondarydata = true;
      this.btn = "Update"
    })
  }



}
