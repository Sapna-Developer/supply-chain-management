import { HttpParams } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Overlay } from 'ngx-toastr';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-outgatepassrgp2',
  templateUrl: './outgatepassrgp2.component.html',
  styleUrls: ['./outgatepassrgp2.component.scss']
})
export class Outgatepassrgp2Component implements OnInit {

  
  displayedColumns: any[] = [
    'sno',
    'material_code',
    'material_description',
    'unit_of_measurement',
    'storage_location',
    'request_quantity',
    'quantity',
    'item_remarks',
    // 'batch_no',
    'valution_type',
    'action'

  ];
  displayedColumns1: any[] = [
    'sno',
    'Date',
    'Number',
    // 'company_Name',
    // 'tocompanyname',
    'request_number',
    // 'transfer_type',
    'gate_outward_number',
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
  dialogdata: any = {};
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
  batchno: any[] = [];
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
  dialogdataedit: any = {};
  systemref: any;
  selectedIndex: number;
  dialogdataeditmatcode: any;
  dialogdataeditmatdes: any;
  editdataa: any;
  deleteid: any;
  outgatepassrgpnum: any;
  createNewFile: any = {};
  filedata: any;
  imageUrl: string;
  deleteNumber: any;
  deletemodel: any = {};
  fileUploadUrls: any[] = [];
  filenamearray: any[] = [];
  filenamearray1: any[] = [];
  selectedfiles: any[] = [];
  searchData: any;
  columnname: any;
  smsdata: string;
  smsdata1: any;
  //end
  constructor(private dialog: MatDialog,
    private custservice: CustomerService,
    private snackbar: MatSnackBar,
    public overlay: Overlay,
    private alertcall: AlertCallsService,
    private injector: Injector,
    private router: Router
  ) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
  }

  ngOnInit(): void {
    this.formdata.dateee = moment(new Date()).format("YYYY-MM-DD");
    this.formdata.requestdate = moment(new Date()).format("YYYY-MM-DD");
    this.formdata.lrdate = moment(new Date()).format("YYYY-MM-DD");
    this.formdata.expectedredate = moment(new Date()).format("YYYY-MM-DD");
    this.getcompanydata();
    this.getmasterdata();
    this.getstoragelocData();
    this.getvalutionData();
    this.getData();
    this.getlogdata();
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
      "key": this.selectedmaterial1
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res);
      this.masterData = res.data

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
        this.matName.push(ele.material_description)
        this.UOM.push(ele.uom)
        this.storageLocation.push(ele.storagelocation)
        this.ReqQTY.push(Number(ele.reqqty))
        this.quantity.push(Number(ele.quantity))
        this.itemremarks.push(ele.itemremarks)
        // this.batchno.push(ele.batchno)
        this.valutionType.push(ele.valutiontype)
      })
      let obj = {
        "work_order_number": this.formdata.workordernum,
        "date": moment(this.formdata.dateee).format("YYYY-MM-DD"),
        // "company_name": this.formdata.companyname,
        // "to_company_name": this.formdata.tocompanyname,
        "consignee_name": this.formdata.consigneename,
        "request_number": this.formdata.requestnumber,
        "request_date": moment(this.formdata.requestdate).format("YYYY-MM-DD"),
        "receiver_name": this.formdata.receivername,
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
        // "batch_number": this.batchno,
        "comments": this.formdata.comments,
        "locations": this.formdata.location,
        "purpose": this.formdata.purpose,
        "command": "add"

      }
      this.custservice.addoutgatepassrgp2(obj).subscribe((res: any) => {
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
          // this.batchno = []
          this.getData()
          this.getlogdata()
          this.resultogpnumber = res['reference']
          if (this.fileUploadUrlsgt.length > 0) {
            this.uploadselectedfiles()
          }
        } else {
          // this.alertcall.showWarning('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'error',
            // title: res['reference'],
            width: 500,
          });
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.ReqQTY = []
          this.quantity = []
          this.itemremarks = []
          // this.batchno = []
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
        this.ReqQTY.push(Number(ele.reqqty || ele.request_quantity))
        this.quantity.push(Number(ele.quantity || ele.quantity))
        this.itemremarks.push(ele.itemremarks || ele.item_remarks)
        // this.batchno.push(ele.batchno || ele.batch_number)
        this.valutionType.push(ele.valutiontype || ele.valuation_type)

      }
      )


      let obj = {
        "reason": this.editModel.reason,
        "work_order_number": this.formdata.workordernum,
        "date": moment(this.formdata.dateee).format("YYYY-MM-DD"),
        // "company_name": this.formdata.companyname,
        // "to_company_name": this.formdata.tocompanyname,
        "consignee_name": this.formdata.consigneename,
        "request_number": this.formdata.requestnumber,
        "request_date": moment(this.formdata.requestdate).format("YYYY-MM-DD"),
        "receiver_name": this.formdata.receivername,
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
        // "batch_number": this.batchno,
        "comments": this.formdata.comments,
        "command": "edt",
        "number": this.editednumber,
        "locations": this.formdata.location,
        "purpose": this.formdata.purpose
      }
      this.custservice.addoutgatepassrgp2(obj).subscribe((res: any) => {
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
          // this.alertcall.showWarning('Accepted', res['message']);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'error',
            // title: res['reference'],
            width: 500,
          });
          this.SNO = []
          this.matCode = []
          this.matName = []
          this.UOM = []
          this.storageLocation = []
          this.ReqQTY = []
          this.quantity = []
          this.itemremarks = []
          // this.batchno = []
        }
      })
    }
  }
  //end

  //add outgatepassrgp model
  addoutgatePassRequest(data: any) {
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
  }
  //
  getData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex,
    }
    this.custservice.getoutgatepassrgp2(obj).subscribe((res: any) => {
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
      key: "OutGatePassRGP2"
    }
    this.custservice.getActivityLog(obj).subscribe((res: any) => {
      if (res.log.length > 0) {
        this.logdata = res.log
      }
    })
  }
  //Edit service integration
  editdata(row1: any, index: any, data: any) {
    // this.editDATAA=false
    console.log(row1);


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
    this.dialogdataedit.matcode = this.systemref || row1.matcode
    this.dialogdataedit.uom = row1.uom || row1.unit_of_measurment
    this.dialogdataedit.storagelocation = row1.storagelocation || row1.storage_location
    this.dialogdataedit.reqqty = row1.reqqty || row1.request_quantity
    this.dialogdataedit.quantity = row1.qty || row1.quantity
    this.dialogdataedit.itemremarks = row1.itemremarks || row1.item_remarks
    // this.dialogdataedit.batchno = row1.batchno || row1.batch_number
    this.dialogdataedit.valutiontype = row1.valutiontype || row1.valuation_type
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
      number: this.editednumber,

    }
    this.custservice.addoutgatepassrgp2(obj).subscribe((res: any) => {
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
        // this.formdata.transfertype = this.editdataa.Transfer_type,
        this.formdata.expectedredate = moment(this.editdataa.expected_return_date).format("YYYY-MM-DD"),
        this.formdata.vehiclenumber = this.editdataa.vehicle_number,
        this.formdata.transportername = this.editdataa.transporter_name,
        this.formdata.lrnumber = this.editdataa.lr_number,
        this.formdata.lrdate = moment(this.editdataa.lr_date).format("YYYY-MM-DD"),
        this.formdata.comments = this.editdataa.comments,
        this.formdata.consigneename = this.editdataa.consignee_name,
        this.formdata.location = this.editdataa.locations,
        this.formdata.purpose = this.editdataa.purpose
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
  deleteFile() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
      "reason": this.deletemodel.reason
    }
    this.custservice.deleteoutgatepassrgp2(obj).subscribe((res: any) => {
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
    const url = this.imageUrl + '/' + file.file_path;
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
    this.router.navigate(['/inventory2/printoutgatepassrgp2'], { queryParams: { 'ogpnumber': data.number } })
    // if (data.Transfer_type === "NRGP2") {
    //   this.router.navigate(['/planning2/printoutgatepassrgp2nrgp'],{ queryParams: {'ogpnumber': data.number}})
    // } else {
    //   this.router.navigate(['/planning2/printoutgatepassrgp2'], { queryParams: { 'ogpnumber': data.number } })

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
      this.custservice.getoutgatepassrgp2(obj).subscribe((res: any) => {
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
    this.custservice.getsmsdata2(obj).subscribe((res: any) => {
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
}
