import { Component, Injector, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import Swal from 'sweetalert2';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchaserequest2',
  templateUrl: './purchaserequest2.component.html',
  styleUrls: ['./purchaserequest2.component.scss']
})

export class Purchaserequest2Component implements OnInit {
  smsdata: any;
  fileUploadUrls: any[] = []
  filenamearray: any[] = []
  filenamearray1: any[] = []
  fileUploadUrlspr: any[] = []
  selectedfiles: any[] = []
  prnumber: any;
  filedata: any;
  deleteid: any;
  dialogRef: any = null;
  editdataa: any;
  editednumber: any;
  resultprnumber: any;
  logdata: any;
  columnname: any;
  searchData: string;

  constructor(private dialog: MatDialog, private custservice: CustomerService,
    private snackbar: MatSnackBar, public overlay: Overlay,
    private alertcall: AlertCallsService, public router: Router,
    public route: ActivatedRoute, private injector: Injector) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  dataSource = new MatTableDataSource();
  dataSourceList = new MatTableDataSource();

  displayedColumns: any[] = [
    'lineItem', 'materialCode', 'materialDescription', 'uom', 'unitPrice', 'Quantity', 'totalPrice', 'itemremarks', 'action'
  ]

  displayedColumnsList: any[] = [
    "sno", "MSRNnum", "date", "action"
  ]
  demo1TabIndex: any = 0;
  dialogdata: any = {};
  editeddialogdata: any = {}
  formdata: any = {};
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  companyData: any;
  date: any
  classification: any;
  companyname: any;
  poduration: any;
  comments: any;
  purpose: any;
  location: any
  recomendedagency: any;
  identer: any;
  remarks: any;
  masterData: any;
  materialCODE: any;
  materialNAME: any;
  selectedmaterial: any;
  selectedmaterialedit: any;
  matcode: any
  uom: any
  quantity: any
  unitprice: any
  totalprice: any
  itemremarks: any
  finaldataarray: any[] = []
  formdatatotablearray: any[] = []
  selectedIndex: any
  systemref: any;
  editeddialogdatamatcode: any
  deleteNumber: any
  SNO: any[] = []
  matCode: any[] = []
  matName: any[] = []
  UOM: any[] = []
  UnitPrice: any[] = []
  Quantity: any[] = []
  TotalPrice: any[] = []
  ItemRemarks: any[] = []
  totPrice: number
  createNewFile: any = {}
  imageUrl = environment.base_url
  isactivestatus: any = true;
  btn: any = "Save"
  editModel: any = {}
  deletemodel: any = {}
  openfileuploadmodel(data: any, row1: any) {
    this.dialog.open(data, {
      width: '800px'
    })
    this.prnumber = row1.number
    this.getexistingfiles()
  }
  getexistingfiles() {
    let params = new HttpParams();
    params = new HttpParams()
      .set("document_number", this.prnumber,)
      .set("document_type", "Purchase Request")
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
      .set("document_number", this.prnumber,)
      .set("document_type", "Purchase Request")
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
    postData.append("document_type", "Purchase Request");
    postData.append("document_number", this.prnumber);
    for (const file of this.fileUploadUrls) {
      postData.append("doc", file)
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
  uploadprfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlspr = fileInput.target.files;
      for (const file of this.fileUploadUrlspr) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }


    }

  }
  uploadedselctedfiles() {
    const postData = new FormData();
    postData.append("document_type", "Daily Material Receipt");
    postData.append("document_number", this.resultprnumber);
    for (const file of this.selectedfiles) {
      postData.append("doc", file)
    }


    this.custservice.addfileupload(postData).subscribe((res: any) => {
      if (res && res['status_code'] == '200') {
        this.fileUploadUrlspr = []
        this.selectedfiles = []
        this.filenamearray1 = []
      } else {

      }
    })
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData()
  }

  getData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex,
      "key": ""
    }
    this.custservice.getpurchaseRequest2(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }

  getcompanydata() {
    let obj = {
      "command": "lst",
      lmt:100000,
      pid:1
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data
      console.log(this.companyData);
    })
  }

  getmasterdata() {
    let obj = {
      "command": 'lst',
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedmaterial || this.selectedmaterialedit
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data

    })
  }
  filterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterial = ev.target.value
    if (this.selectedmaterial.length > 2) {
      this.getmasterdata()
    }
    if (!this.selectedmaterial) {
      this.getmasterdata()
    }
  }
  selectedmaterialuom() {
    //console.log(this.dialogdata.matcode);
    this.masterData.forEach((ele: any) => {
      if (ele.system_reference_1 == this.dialogdata.matcode) {
        this.dialogdata.uom = ele.uom_1
        this.materialCODE = ele.code
        this.materialNAME = ele.name
      }
    });
    this.getSMSdata()
  }
  editfilterdata(ev: any) {
    console.log(ev.target.value);
    this.selectedmaterialedit = ev.target.value
    if (this.selectedmaterialedit.length > 2) {
      this.getmasterdata()
    }
    if (!this.selectedmaterialedit) {
      this.getmasterdata()
    }
  }
  selectedmaterialuomedit() {
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdata.uom = el.uom_1
        this.materialCODE = el.code
        this.materialNAME = el.name
      }
    });
    console.log(this.matcode);
    this.getSMSdata()
  }
  addpurchacerequestdata(data: any) {
    this.dialog.open(data, {
      width: '1100px',
    })
  }
  closedialogdata() {
    this.dialog.closeAll();
  }

  binddatatotable(form: any) {
    this.dialogdata['material_code'] = this.materialCODE
    this.dialogdata['material_description'] = this.materialNAME
    console.log(this.dialogdata);
    this.finaldataarray.push(this.dialogdata)
    this.formdatatotablearray.push(this.dialogdata)
    console.log(this.formdatatotablearray);
    this.dataSource.data = this.formdatatotablearray
    console.log(this.dataSource.data)
    this.dialogdata = {}
    this.smsdata = ''
    this.dialog.closeAll();
  }
  editpurchaserequestdata(row1: any, index: any, data: any) {
    console.log(row1)
    this.selectedIndex = this.formdatatotablearray.indexOf(row1)
    console.log(row1)
    this.dialog.open(data, {
      width: '1100px',
    })
    this.masterData.forEach((ele: any) => {
      if (ele.code == row1.material_code) {
        this.systemref = ele.system_reference_1
      }
    })
    this.editeddialogdata.matcode = this.systemref
    this.editeddialogdata.uom = row1.uom || row1.unit_of_measurment
    this.editeddialogdata.unitprice = row1.unitprice || row1.unit_price
    this.editeddialogdata.totalprice = row1.totalprice || row1.total_price
    this.editeddialogdata.itemremarks = row1.itemremarks || row1.item_remarks
    this.editeddialogdata.quantity = row1.quantity

  }
  closeeditdialogdata() {
    this.dialog.closeAll();
  }
  editbindedDatatotable() {
    // this.dataSource.data = this.editeddialogdata
    this.masterData.forEach((el: any) => {
      if (el.system_reference_1 == this.editeddialogdata.matcode) {
        this.editeddialogdatamatcode = el.code
        this.materialCODE = el.code
        this.materialNAME = el.name
      }
      console.log(el.code, el.name);
    });
    this.editeddialogdata['material_code'] = this.materialCODE
    this.editeddialogdata['material_description'] = this.materialNAME
    this.formdatatotablearray.splice(this.selectedIndex, 1, this.editeddialogdata);
    this.dataSource.data = this.formdatatotablearray
    console.log(this.dataSource.data);
    this.editeddialogdata = {}
    this.smsdata = ''
    this.dialog.closeAll();
  }

  deleterowData(index: any) {
    console.log(index)
    this.formdatatotablearray.splice(index, 1);
    this.dataSource.data = this.formdatatotablearray
    //this.finaldataarray=[]
    // console.log(this.dataSource.data)
    //this.dataSource.data = new MatTableDataSource(this.count);

  }

  deletepurreqdata(rw: any, data: any) {
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
    this.custservice.deletepurchaserequest2(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason = ""
        this.getData()
        this.getlogdata()
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })

  }
  savefinaldata(fr: any) {
    if (this.btn === 'Save') {
      console.log(this.formdatatotablearray);

      this.formdatatotablearray.forEach((val: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(val.material_code)
        this.matName.push(val.material_description)
        this.UOM.push(val.uom)
        this.UnitPrice.push(val.unitprice)
        this.Quantity.push(val.quantity)
        //this.TotalPrice.push(val.totalprice)
        this.ItemRemarks.push(val.itemremarks)
      })
      let obj = {
        "date": moment(this.formdata.date).format("YYYY-MM-DD"),
        // "company_name": this.formdata.companyname,
        "location": this.formdata.location,
        "indenter": this.formdata.identer,
        "classification": this.formdata.classification,
        "po_duration": this.formdata.poduration,
        "purpose": this.formdata.purpose,
        "recommended_agency": this.formdata.recomendedagency,
        "line_item": this.SNO,
        "material_code": this.matCode,
        "material_description": this.matName,
        "unit_of_measurment": this.UOM,
        "quantity": this.Quantity,
        "unit_price": this.UnitPrice,
        "item_remarks": this.ItemRemarks,
        "comments": this.formdata.comments,
        "remarks": this.formdata.remarks,
        "command": "add"

      }
      this.custservice.addPurchaseRequest2(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.formdatatotablearray = []
          this.finaldataarray = []
          this.dataSource.data = []
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.UnitPrice = []
          this.Quantity = []
          //this.TotalPrice.push(val.totalprice)
          this.ItemRemarks = []
          this.getData();
          this.getlogdata();
          this.smsdata = ''
          this.resultprnumber = res['reference']
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles()
          }

        } else {
          this.alertcall.showWarning('Accepted', res['message']);

          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.UnitPrice = []
          this.Quantity = []

          this.ItemRemarks = []
        }

      })
    } if (this.btn === 'Update') {
      console.log(this.formdatatotablearray);

      this.formdatatotablearray.forEach((val: any, index) => {
        this.SNO.push(index + 1);
        this.matCode.push(val.material_code)
        this.matName.push(val.material_description)
        this.UOM.push(val.uom || val.unit_of_measurment)
        this.UnitPrice.push(val.unitprice || val.unit_price)
        this.Quantity.push(val.quantity)
        //this.TotalPrice.push(val.totalprice)
        this.ItemRemarks.push(val.itemremarks || val.item_remarks)
      })
      let obj = {
        "reason": this.editModel.reason,
        "date": moment(this.formdata.date).format("YYYY-MM-DD"),
        "number": this.editednumber,
        // "company_name": this.formdata.companyname,
        "location": this.formdata.location,
        "indenter": this.formdata.identer,
        "classification": this.formdata.classification,
        "po_duration": this.formdata.poduration,
        "purpose": this.formdata.purpose,
        "recommended_agency": this.formdata.recomendedagency,
        "line_item": this.SNO,
        "material_code": this.matCode,
        "material_description": this.matName,
        "unit_of_measurment": this.UOM,
        "quantity": this.Quantity,
        "unit_price": this.UnitPrice,
        "item_remarks": this.ItemRemarks,
        "comments": this.formdata.comments,
        "remarks": this.formdata.remarks,
        "command": "edt"

      }
      this.custservice.addPurchaseRequest2(obj).subscribe((res: any) => {
        if (res && res['status_code'] == "200") {
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            // title: res['reference'],
            width: 500,
          });
          fr.reset();
          this.formdatatotablearray = []
          this.finaldataarray = []
          this.dataSource.data = []
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.UnitPrice = []
          this.Quantity = []
          //this.TotalPrice.push(val.totalprice)
          this.ItemRemarks = []
          this.getData();
          this.getlogdata()
          this.editednumber = ""
          this.editModel.reason = ""
          this.resultprnumber = this.editednumber
          if (this.fileUploadUrlspr.length > 0) {
            this.uploadedselctedfiles()
          }
          this.smsdata = ''
          this.btn = "Save"
        } else {
          this.alertcall.showWarning('Accepted', res['message']);

          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.UnitPrice = []
          this.Quantity = []

          this.ItemRemarks = []
        }

      })

    }
  }
  calcresult() {
    this.dialogdata.totalprice = (this.dialogdata.quantity * this.dialogdata.unitprice).toFixed(2)
  }
  calcresultedit() {
    this.editeddialogdata.totalprice = (this.editeddialogdata.quantity * this.editeddialogdata.unitprice).toFixed(2)
  }


  ngOnInit(): void {
    this.isactivestatus = true;
    this.formdata.date = moment(new Date()).format("YYYY-MM-DD")
    this.demo1TabIndex = 0;
    this.route.queryParams.subscribe((params: any) => {

      if (params.tab == 'notifications') {
        this.demo1TabIndex = 1;
        console.log(params);

      }
      else {
        this.demo1TabIndex = 0;
      }
    })
    this.getData();
    this.getcompanydata();
    this.getmasterdata();
    this.getlogdata()
  }
  getlogdata() {
    let obj = {
      command: "log",
      key: "PurchaseRequest2"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
    })
  }
  editdata(data: any, dialog: any) {
    this.dialog.open(dialog, {
      width: "400px"
    })
    this.editednumber = data.number
  }
  saveeditreason() {
    let obj = {
      command: "mat",
      field: "number",
      key: this.editednumber,
    }
    this.custservice.addPurchaseRequest2(obj).subscribe((res: any) => {
      this.dialog.closeAll()
      this.editdataa = res.data[0]
      this.formdatatotablearray = res.data
      this.dataSource.data = this.formdatatotablearray
      this.formdata.date = moment(this.editdataa.date).format("YYYY-MM-DD")
      this.formdata.classification = this.editdataa.classification
      this.formdata.companyname = this.editdataa.company_name
      this.formdata.poduration = this.editdataa.po_duration
      this.formdata.comments = this.editdataa.comments
      this.formdata.purpose = this.editdataa.purpose
      this.formdata.location = this.editdataa.location
      this.formdata.recomendedagency = this.editdataa.recommended_agency
      this.formdata.identer = this.editdataa.indenter
      this.formdata.remarks = this.editdataa.remarks
      this.demo1TabIndex = 0;
      this.btn = "Update"
    })
  }
  printpurchasereq(data: any) {
    console.log(data.number);

    this.router.navigate(['/planning2/printpurchaserequest2'], { queryParams: { 'dmrumber': data.number } })
  }
  validateNumber(e: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = e.target.value + String.fromCharCode(e.charCode);

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }
  getSMSdata() {
    let obj = {
      "material_code": this.materialCODE,
      "command": "sms"
    }
    this.custservice.getsmsdata2(obj).subscribe((res: any) => {
      console.log(res);
      if (res && res['status_code'] == '200') {
        console.log(res);

        this.smsdata = res.message

        // this.total=0
        // this.totalvalue=0
        //   this.smsdata.forEach((el:any)=>{
        //     this.total+= el.quantity;
        //     this.totalvalue += el.value;
        //     console.log(el.quantity);
        // })


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
        this.smsdata = ""
        this.alertcall.showWarning('Warning', res['message']);
      }
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
      this.custservice. getSearchPurchaseRequest2(obj).subscribe((res: any) => {
        this.reaData = false;
        this.totalRecords = res?.count;
        this.dataSourceList.data = res.data
        if (res.data.length == 0) {
          this.reaData = true
        }
      })
    }else if(!this.searchData){
      this.getData()
      this.columnname=""
    }
  }
  
}

