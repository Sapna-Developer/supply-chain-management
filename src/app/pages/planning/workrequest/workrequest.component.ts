import { Component, Injector, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-workrequest',
  templateUrl: './workrequest.component.html',
  styleUrls: ['./workrequest.component.scss']
})
export class WorkrequestComponent implements OnInit {
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
  wrnumber: any;
  deleteid: string;
  filedata: any;
  fileUploadUrls: any[] = []
  resultwrnumber: any;
  editednumber: any;
  editdataa: any;
  logdata: any;
  UOMdata: any;
  searchData: string;
  columnname: any;
  documnet_nodata: any;

  constructor(
    private custservice: CustomerService, private dialog: MatDialog,
    private alertcall: AlertCallsService, public overlay: Overlay,
    private router: Router, private injector: Injector, private route: ActivatedRoute
  ) { this.dialogRef = this.injector.get(MatDialogRef, null); }

  displayedColumns: any[] = [
    'lineItem', 'serviceDescription', 'uom', 'quantity', 'unitprice', 'totalpricetab', 'itemremarks', 'action'
  ]

  displayedColumnsList: any[] = [
    'sno', 'number', 'date', 'companyname', 'servicedescription', 'action'
  ]

  dataSource = new MatTableDataSource();
  dataSourceList = new MatTableDataSource();
  dialogRef: any = null;
  companyData: any
  formdata: any = {}
  dialogdata: any = {}
  editdialogdata: any = {}
  companyname: any;
  location: any;
  date: any;
  reqRefdate: any;
  woduration: any;
  classification: any;
  purpose: any;
  recagency: any;
  servicecode: any
  uom: any
  requiredquantity: any;
  rate: any;
  estimatedCost: any;
  remarks: any;
  dialogdataArray: any[] = []
  finaldataArray: any[] = []
  servicemasterData: any
  selectedservicemaster: any;
  serviceCODE: any;
  serviceNAME: any;
  comments: any
  itemremarks: any
  formremarks: any;
  serviceDesc: any;
  formuom: any;
  unitprice: any
  quantity: any
  totalprice: any;
  boqcomments: any;
  unitPrice: number = 0
  totalPrice: any
  Itemremarks: any
  boqitemdes: any[] = []
  boquom: any[] = []
  boqquantity: any[] = []
  boqunitprice: any[] = []
  boqtotalprice: any[] = []
  boqitemremarks: any[] = []
  SNO: any[] = []
  deleteNumber: any
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  totalpricesum: number = 0;
  finlunitprice: number = 0
  intender: any;
  masterData: any;
  materialCODE: any;
  materialNAME: any;
  selectedmaterial: any;
  selectedIndex: any
  selectedservicemasteredit: any
  imageUrl = environment.base_url
  demo1TabIndex: any = 0
  createNewFile: any = {}
  fileUploadUrlswr: any[] = []
  filenamearray: any[] = []
  filenamearray1: any[] = []
  selectedfiles: any[] = []
  btn: any = "Save"
  deletemodel: any = {}
  editModel: any = {}
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.wrnumber = row1.number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.wrnumber,)
      .set("document_type", "Work Request")

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
      .set("document_number", this.wrnumber,)
      .set("document_type", "Work Request")
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
    const postData = new FormData();
    postData.append("document_type", "Work Request");
    postData.append("document_number", this.wrnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.alertcall.showSuccess("Accepted", res['message'])
        this.getexistingfiles()
        this.filenamearray = []
      } else {
        this.alertcall.showWarning("Error", res['message'])
      }
    })
  }

  uploadwrfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlswr = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for (const file of this.fileUploadUrlswr) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }
    }
  }

  uploadselectedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Work Request");
    postData.append("document_number", this.resultwrnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }
    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.filenamearray1 = []
        this.selectedfiles = []
        this.fileUploadUrlswr = []
      } else {

      }
    })
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
  addworkrequestdata(data: any) {
    this.dialog.open(data, {
      width: '1100px'
    })
  }
  closedialogdata() {
    this.dialog.closeAll();
  }

  binddatatotable(fr: any) {
    console.log(this.dialogdata);
    this.dialogdataArray.push(this.dialogdata)
    ///this.finaldataArray.push(this.dialogdata)
    this.dataSource.data = this.dialogdataArray
    this.dialog.closeAll()
    this.dialogdata = {}
    this.totalpricesum = 0
    this.dataSource.data.forEach((a: any) => {

      this.totalpricesum += a.totalPrice
      this.formdata.totalprice = this.totalpricesum
      //this.formdata.unitprice = (this.totalpricesum / this.formdata.quantity)
      // debugger
      //this.formdata.unitprice  = Number(this.totalpricesum/ this.formdata.quantity)

    })
    if (this.formdata.quantity == null) {
      this.formdata.unitprice = 0
    } else {
      this.formdata.unitprice = (this.formdata.totalprice / this.formdata.quantity)
    }

  }
  editworkorderData(row1: any, index: any, data: any) {
    console.log(row1)
    this.selectedIndex = this.dialogdataArray.indexOf(row1)
    console.log(row1)
    this.dialog.open(data, {
      width: '1000px'
    })
    this.editdialogdata.servicedescription = row1.servicedescription || row1.item_description
    this.editdialogdata.uom = row1.uom || row1.unit_of_measurment
    this.editdialogdata.requiredquantity = row1.requiredquantity || row1.quantity
    this.editdialogdata.unitPrice = row1.unitPrice || row1.unit_price
    this.editdialogdata.totalPrice = row1.totalPrice || row1.total_amount
    this.editdialogdata.Itemremarks = row1.Itemremarks || row1.item_remarks
  }
  editbindedDatatotable() {
    this.dialogdataArray.splice(this.selectedIndex, 1, this.editdialogdata);
    this.dataSource.data = this.dialogdataArray
    console.log(this.dataSource.data);
    this.editdialogdata = {}
    this.dialog.closeAll();
    this.totalpricesum = 0
    this.dataSource.data.forEach((a: any) => {
      this.totalpricesum += (a.total_amount || a.totalPrice)
      this.formdata.totalprice = this.totalpricesum
    })
  }

  deleterowData(index: any) {
    console.log(index)
    this.dialogdataArray.splice(index, 1);
    this.dataSource.data = this.dialogdataArray
    this.totalpricesum = 0
    this.dataSource.data.forEach((a: any) => {
      this.totalpricesum += a.totalPrice
      this.formdata.totalprice = this.totalpricesum
    })
  }

  getsrvcMasterData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedservicemaster || this.selectedservicemasteredit
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
    console.log(this.dialogdata.servicedescription)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.dialogdata.servicedescription) {
        this.dialogdata.uom = ele.unit_of_measurment
        this.serviceCODE = ele.code
        this.serviceNAME = ele.name
      }
    });
    console.log(this.dialogdata.uom)
  }

  filterdataedit(ev: any) {
    console.log(ev.target.value);
    this.selectedservicemasteredit = ev.target.value
    if (this.selectedservicemasteredit.length > 2) {
      this.getsrvcMasterData()
    }
    if (!this.selectedservicemasteredit) {
      this.getsrvcMasterData()
    }
  }

  selectedserviceuomedit() {
    console.log(this.editdialogdata.servicedescription)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.editdialogdata.servicedescription) {
        this.editdialogdata.uom = ele.unit_of_measurment
        this.serviceCODE = ele.code
        this.serviceNAME = ele.name
      }
    });
    console.log(this.dialogdata.uom)
  }

  filteformrdata(ev: any) {
    console.log(ev.target.value);
    this.selectedservicemaster = ev.target.value
    if (this.selectedservicemaster.length > 2) {
      this.getsrvcMasterData()
    }
    if (!this.selectedservicemaster) {
      this.getsrvcMasterData()
    }
  }

  selectedserviceformuom() {
    console.log(this.formdata.serviceDesc)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.formdata.serviceDesc) {
        this.formdata.formuom = ele.unit_of_measurment
        this.formdata.servicecode = ele.code
        this.serviceCODE = ele.code
        this.serviceNAME = ele.name
      }
    });
    console.log(this.dialogdata.uom)
  }

  savefinaldata(fr: any) {
    if (this.btn === 'Save') {
      console.log(this.dialogdataArray);
      this.dialogdataArray.forEach((val: any, index) => {
        this.SNO.push(index + 1),
          this.boqitemdes.push(val.servicedescription),
          this.boquom.push(val.uom),
          this.boqquantity.push(val.requiredquantity),
          this.boqunitprice.push(val.unitPrice),
          this.boqtotalprice.push(val.totalPrice),
          this.boqitemremarks.push(val.Itemremarks)
      })
      let obj = {
        "command": "add",
        "boq_item_remarks": this.boqitemremarks,
        "boq_item_description": this.boqitemdes,
        "boq_unit_of_measurment": this.boquom,
        "boq_quantity": this.boqquantity,
        "boq_unit_price": this.boqunitprice,
        "comments": this.formdata.comments,
        "date": moment(this.formdata.date).format("YYYY-MM-DD"),
        "company_name": this.formdata.companyname,
        "location": this.formdata.location,
        "indenter": this.formdata.intender,
        "classification": this.formdata.classification,
        "po_duration": this.formdata.woduration,
        "purpose": this.formdata.purpose,
        "recommended_agency": this.formdata.recagency,
        "service_description": this.formdata.serviceDesc,
        "item_remarks": this.formdata.itemremarks,
        "remarks": this.formdata.formremarks,
        "unit_of_measurment": this.formdata.formuom,
        "quantity": this.formdata.quantity,
        "unit_price": this.formdata.unitprice,
        // "boq_comments": this.formdata.boqcomments,
        "service_code": this.formdata.servicecode
      }
      this.custservice.addworkrequestdata(obj).subscribe((res: any) => {
        console.log(obj);
        console.log(res)
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.dataSource.data = []
          this.SNO = []
          this.boqitemdes = []
          this.boquom = []
          this.boqquantity = []
          this.boqunitprice = []
          this.boqtotalprice = []
          this.boqitemremarks = []
          this.totalpricesum = 0
          this.getworkrequestlistData()
          this.getlogdata()
          this.resultwrnumber = res['reference']
          if (this.fileUploadUrlswr.length > 0) {
            this.uploadselectedfiles()
          }

        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO = []
          this.boqitemdes = []
          this.boquom = []
          this.boqquantity = []
          this.boqunitprice = []
          this.boqtotalprice = []
          this.boqitemremarks = []
        }
      })
    } else {
      console.log(this.dialogdataArray);
      this.dialogdataArray.forEach((val: any, index) => {
        this.SNO.push(index + 1),
          this.boqitemdes.push(val.servicedescription || val.item_description),
          this.boquom.push(val.uom || val.unit_of_measurment),
          this.boqquantity.push(val.requiredquantity || val.quantity),
          this.boqunitprice.push(val.unitPrice || val.unit_price),
          this.boqtotalprice.push(val.totalPrice || val.total_amount),
          this.boqitemremarks.push(val.Itemremarks || val.item_remarks)
      })
      let obj = {
        "reason": this.editModel.reason,
        "command": "edt",
        "wr_number": this.editednumber,
        "boq_item_remarks": this.boqitemremarks,
        "boq_item_description": this.boqitemdes,
        "boq_unit_of_measurment": this.boquom,
        "boq_quantity": this.boqquantity,
        "boq_unit_price": this.boqunitprice,
        "comments": this.formdata.comments,
        "date": moment(this.formdata.date).format("YYYY-MM-DD"),
        "company_name": this.formdata.companyname,
        "location": this.formdata.location,
        "indenter": this.formdata.intender,
        "classification": this.formdata.classification,
        "po_duration": this.formdata.woduration,
        "purpose": this.formdata.purpose,
        "recommended_agency": this.formdata.recagency,
        "service_description": this.formdata.serviceDesc,
        "item_remarks": this.formdata.itemremarks,
        "remarks": this.formdata.formremarks,
        "unit_of_measurment": this.formdata.formuom,
        "quantity": this.formdata.quantity,
        "unit_price": this.formdata.unitprice,
        // "boq_comments": this.formdata.boqcomments,
        "service_code": this.formdata.servicecode
      }
      this.custservice.addworkrequestdata(obj).subscribe((res: any) => {
        console.log(obj);
        console.log(res)
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.dataSource.data = []
          this.SNO = []
          this.boqitemdes = []
          this.boquom = []
          this.boqquantity = []
          this.boqunitprice = []
          this.boqtotalprice = []
          this.boqitemremarks = []
          this.totalpricesum = 0
          this.getworkrequestlistData()
          this.getlogdata()
          this.editModel.reason = ""
          this.resultwrnumber = this.editednumber
          if (this.fileUploadUrlswr.length > 0) {
            this.uploadselectedfiles()
          }
          this.btn = "Save"
        } else {
          this.alertcall.showWarning('Accepted', res['message']);
          this.SNO = []
          this.boqitemdes = []
          this.boquom = []
          this.boqquantity = []
          this.boqunitprice = []
          this.boqtotalprice = []
          this.boqitemremarks = []
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

  getworkrequestlistData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex
    }
    this.custservice.getWRlistData(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }

  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getworkrequestlistData()
  }

  deleteworkrequestdata(rw: any, data: any) {
    this.dialog.open(data, {
      width: '400px',
      scrollStrategy: new NoopScrollStrategy()
    })
    this.deleteNumber = rw.number;
    console.log(this.deleteNumber)
    console.log(rw, data)
  }

  deleteItem() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
      "reason": this.deletemodel.reason
    }
    this.custservice.deleteWorkRequestData(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.getworkrequestlistData()
        this.getlogdata()
        this.deletemodel.reason = ""
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  }

  calcresult() {
    this.dialogdata.totalPrice = (this.dialogdata.requiredquantity * this.dialogdata.unitPrice)
  }

  calcformresult() {
    this.formdata.unitprice = (this.formdata.totalprice / this.formdata.quantity)
  }

  // gettotalpricesum(data:any){
  //   let sum = 0;
  //   this.dataSource.data.forEach((ele:any)=>{
  //     sum += ele.totalpricetab
  //   })
  //   return sum;
  // }

  ngOnInit(): void {
    this.formdata.date = moment(new Date()).format("YYYY-MM-DD")
    this.getsrvcMasterData();
    this.getcompanydata();
    this.getworkrequestlistData();
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
    this.getlogdata()
  }

  getunitData() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getunitdata(obj).subscribe((res: any) => {
      this.UOMdata = res.data
    })
  }

  getlogdata() {
    let obj = {
      command: "log",
      key: "WorkRequest"
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

  printworkrequest(data: any) {
    console.log(data.number);
    this.router.navigate(['/planning/printworkreq'], { queryParams: { 'wrnumber': data.number } })
  }

  editworkrequestdata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.editednumber = data.number
  }
  
  saveeditreason() {
    let obj = {
      command: "mat",
      // field: "number",
      number: this.editednumber,
    }
    this.custservice.addworkrequestdata(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      this.editdataa = res.data[0]
      this.dialogdataArray = res.table
      this.dataSource.data = this.dialogdataArray
      this.formdata.comments = this.editdataa.comments,
        this.formdata.date = moment(this.editdataa.date).format("YYYY-MM-DD"),
        this.formdata.companyname = this.editdataa.company_name,
        this.formdata.location = this.editdataa.location,
        this.formdata.intender = this.editdataa.indenter,
        this.formdata.classification = this.editdataa.classification,
        this.formdata.woduration = this.editdataa.po_duration,
        this.formdata.purpose = this.editdataa.purpose,
        this.formdata.recagency = this.editdataa.recommended_agency,
        this.formdata.serviceDesc = this.editdataa.service_description,
        this.formdata.itemremarks = this.editdataa.item_remarks,
        this.formdata.formremarks = this.editdataa.remarks,
        this.formdata.formuom = this.editdataa.unit_of_measurment,
        this.formdata.quantity = this.editdataa.quantity,
        this.formdata.unitprice = this.editdataa.unit_price,
        // this.formdata.boqcomments=this.editdataa.,
        this.formdata.totalprice = this.editdataa.total_price
      this.formdata.servicecode = this.editdataa.service_code
      this.totalpricesum = 0
      this.dataSource.data.forEach((a: any) => {

        this.totalpricesum += a.total_amount
        this.formdata.totalprice = this.totalpricesum
      })
      this.demo1TabIndex = 0;
      this.btn = "Update"

    })
  }
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
      this.custservice. getSearchWorkRequest(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourceList.data = res.data
        if (res.data.length == 0) {
          this.reaData = true
        }
      })
    }else if(!this.searchData){
      this.getworkrequestlistData()
      this.columnname=""
    }
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
    document_name: "WorkRequest",
    document_number:this.documnet_nodata
  };
  this.custservice.AutoDocUpdate2(obj).subscribe((res: any) => {
    if(res && res['status_code']==200){
      this.dialog.closeAll()
      this.alertcall.showSuccess("Accepted", res['message'])
      this.getworkrequestlistData()
    } else {
      this.dialog.closeAll()
      this.alertcall.showWarning("Error", res['message'])
    }      
  });
}

}
