import { Component, Injector, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-bunk-request',
  templateUrl: './vendor-bunk-request.component.html',
  styleUrls: ['./vendor-bunk-request.component.scss']
})
export class VendorBunkRequestComponent implements OnInit {

  dataSourceList = new MatTableDataSource()
  displayedColumnsList = [
    "sno", "number", "date", "company_name", "company_code", "vendor_name", "vendor_code", "purchase_order_number",
    "purchase_order_date", "contractor_name", "vehicle_number", "receiver_name", "contact_number", "material_code",
    "material_description", "unit_of_measurement", "action"
  ]

  demo1TabIndex: number = 0;
  selectedmaterial: any
  tabledata: any = {};
  formdata: any = {};
  editableData:any;
  mat_desc: any;
  line_item: any;
  mat_code: any;
  uom: any;
  quantity: any;
  reaData: boolean;
  pageSize: any = 10;
  pageIndex: any = 1;
  totalRecords: any=0;
  selectedMat_desc: any;
  materialMasterData: any;
  selectedVendor: any;
  vendormasterData: any;
  posting_date: any;
  reference_number: any;
  company_name: any;
  department: any;
  request_type: any;
  vendor_name: any
  contractor_name: any;
  vehicle_number: any;
  purchase_order_number: any;
  Purchase_Order_Date: any;
  contact_number: any;
  receiver_name: any;
  selectedCompany: any;
  companyMasterData: any;
  purchaseOrderData: any;
  selectedPOnumber: any;
  dialogRef: any = null;
  deleteNumber: any;
  editNumber: any;
  btnSaveUpdate: any = "Save"
  selectedcontractorname: any;
  contractorData: any=[]
  vbrnumber: any;
  filedata: any=[]
  createNewFile:any={}
  imageUrl=environment.base_url
  deleteid: any;
  filenamearray:any=[]
  fileUploadUrls:any=[]
  fileUploadUrlsvbr:any=[]
  filenamearray1:any=[]
  selectedfiles:any=[]
  resultvbrnumber: any;
  editednumber: any;
  editModel:any={}
  editdataa: any={};
  logdata: any;
  constructor(
    private custservice: CustomerService,
    private dialog: MatDialog,
    private alertcall: AlertCallsService,
    public overlay: Overlay,
    private router: Router,
    private injector: Injector, private route: ActivatedRoute
  ) { this.dialogRef = this.injector.get(MatDialogRef, null); }

  ngOnInit(): void {
    this.getmasterdata();
    this.getVendorBunkRequestListData();
    this.getcompanydata();
    this.getVendorData();
    this.getPurchaseOrderData();
    this.getcontractorData();
    this.getlogdata();
  }
  filtercontractordata(ev:any){
    this.selectedcontractorname = ev.target.value
    if (this.selectedcontractorname.length > 2) {
      this.getcontractorData()
    }
    if (!this.selectedcontractorname) {
      this.getcontractorData()
    }
  }
  getcontractorData(){
    let obj={
      "command" : "lst",
      "lmt":100000,
      "key": this.selectedcontractorname || ""
    }
    this.custservice.getcontractormasterdata(obj).subscribe((res:any)=>{
      this.contractorData = res.data
    })
  }
  selectedcontractor(){
  }
  validateNumber(e: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = e.target.value + String.fromCharCode(e.charCode);
    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  getVendorBunkRequestListData() {
    let obj = {
      command: "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex
    }
    this.custservice.vendorBunkRequestList(obj).subscribe((res: any) => {
      // debugger;
      // console.log("hello")
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getVendorBunkRequestListData()
  }

  getmasterdata() {
    console.log("hello");

    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedMat_desc
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res: any) => {
      console.log(res)
      this.materialMasterData = res.data
    })
  }

  filterMaterialData(ev: any) {
    console.log(ev.target.value);
    this.selectedMat_desc = ev.target.value
    if (this.selectedMat_desc.length > 2) {
      this.getmasterdata()
    }
    if (!this.selectedMat_desc) {
      this.getmasterdata()
    }
  }

  getmaterialDetails() {
    this.materialMasterData.forEach((ele: any) => {
      if (ele.description == this.tabledata.mat_desc) {
        this.tabledata.mat_code = ele.code;
        this.tabledata.uom = ele.uom_1 || ele.uom_2
      }
    });
  }

  getcompanydata() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedCompany
    }
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      console.log(res)
      this.companyMasterData = res.data
    })
  }

  filterCompanydata(ev: any) {
    this.selectedCompany = ev.target.value
    if (this.selectedCompany.length > 2) {
      this.getcompanydata()
    }
    if (!this.selectedCompany) {
      this.getcompanydata()
    }
  }

  getCompanyDetails() {
    this.companyMasterData.forEach((ele: any) => {
      if (ele.name == this.formdata.company_name) {
        this.formdata.company_code = ele.code
      }
    });
  }

  getVendorData() {
    let obj = {
      "command": "lst",
      "lmt": 1000000,
      "pid": 1,
      "key": this.selectedVendor
    }
    this.custservice.getvendormasterdata(obj).subscribe((res: any) => {
      console.log(res)
      this.vendormasterData = res.data
    })
  }

  filterVendorData(ev: any) {
    this.selectedVendor = ev.target.value
    if (this.selectedVendor.length > 2) {
      this.getVendorData()
    }
    if (!this.selectedVendor) {
      this.getVendorData()
    }
  }

  getVendorDetails() {
    this.vendormasterData.forEach((ele: any) => {
      if (ele.name == this.formdata.vendor_name) {
        this.formdata.vendor_code = ele.code
      }
    });
  }

  getPurchaseOrderData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedPOnumber
    }
    this.custservice.getpurchaseorderdata(obj).subscribe((res: any) => {
      console.log(res)
      this.purchaseOrderData = res.data
    })
  }

  filterPurchaseOrderData(ev: any) {
    this.selectedPOnumber = ev.target.value
    if (this.selectedPOnumber.length > 2) {
      this.getPurchaseOrderData()
    }
    if (!this.selectedPOnumber) {
      this.getPurchaseOrderData()
    }
  }
  editvBunkReqdata(data:any,dialog:any){
    this.dialog.open(dialog,{
      width:"400px"
    })
    this.editednumber=data.number
    // this.initialdata=false;
  }
  saveeditreason(){
    let obj={
      command: "mat",
      // field: "number",
      key: this.editednumber,
    }
    this.custservice.addVendorBunkReqData(obj).subscribe((res:any)=>{
      this.dialog.closeAll()
      console.log(res);
      if(res){
        this.editdataa=res.data[0];
        console.log(this.editdataa);
        
     this.formdata.posting_date=moment(this.editdataa.date).format("YYYY-MM-DD"),
     this.formdata.reference_number=this.editdataa.number,
      this.formdata.company_code=this.editdataa.company_code,
      this.formdata.company_name=this.editdataa.company_name,
      this.formdata.department=this.editdataa.department,
      this.formdata.request_type=this.editdataa.request_type,
      this.formdata.vendor_name=this.editdataa.vendor_name,
      this.formdata.vendor_code=this.editdataa.vendor_code,
      this.formdata.contractor_name=this.editdataa.contractor_name,
      this.formdata.vehicle_number=this.editdataa.vehicle_number,
      this.formdata.purchase_order_number=this.editdataa.purchase_order_number,
      this.formdata.Purchase_Order_Date=moment(this.editdataa.purchase_order_date).format("YYYY-MM-DD"),
      this.formdata.receiver_name=this.editdataa.receiver_name,
      this.formdata.contact_number=this.editdataa.contact_number,
      this.tabledata.mat_code=this.editdataa.material_code,
      this.tabledata.mat_desc=this.editdataa.material_description,
      this.tabledata.uom=this.editdataa.unit_of_measurement,
      this.tabledata.quantity=this.editdataa.quantity
      }  
      this.demo1TabIndex=0;
      this.btnSaveUpdate="Update"
    
    })
  }
  savefinaldata(fr: any) {
    if (this.btnSaveUpdate === "Save") {
      let obj = {
        "command": "add",
        "number": this.formdata.reference_number,
        "company_name": this.formdata.company_name,
        "company_code": this.formdata.company_code,
        "vendor_name": this.formdata.vendor_name,
        "vendor_code": this.formdata.vendor_code,
        "purchase_order_number": this.formdata.purchase_order_number,
        "purchase_order_date": moment(this.formdata.Purchase_Order_Date).format('YYYY-MM-DD'),
        "department": this.formdata.department,
        "request_type": this.formdata.request_type,
        "contractor_name": this.formdata.contractor_name,
        "vehicle_number": this.formdata.vehicle_number,
        "receiver_name": this.formdata.receiver_name,
        "contact_number": this.formdata.contact_number,
        "material_code": this.tabledata.mat_code,
        "material_description": this.tabledata.mat_desc,
        "unit_of_measurement": this.tabledata.uom,
        "quantity": this.tabledata.quantity,
        "date": moment(this.formdata.posting_date).format('YYYY-MM-DD')
      }
      this.custservice.addVendorBunkReqData(obj).subscribe((res: any) => {
        console.log(res);
        Swal.fire({
          text: res['message'],
          title: res['reference'],
          icon: 'success',
          width: 500,
        });
        fr.reset();
        this.formdata = {};
        this.tabledata = {};
        this.getVendorBunkRequestListData();
        this.resultvbrnumber=this.editednumber
        if(this.fileUploadUrlsvbr.length > 0){
         this.uploadingselectedfiles()
        }
      })
    }
    if (this.btnSaveUpdate === "Update") {
      let obj = {
        "command": "edt",
        "number": this.formdata.reference_number,
        "company_name": this.formdata.company_name,
        "company_code": this.formdata.company_code,
        "vendor_name": this.formdata.vendor_name,
        "vendor_code": this.formdata.vendor_code,
        "purchase_order_number": this.formdata.purchase_order_number,
        "purchase_order_date": moment(this.formdata.Purchase_Order_Date).format('YYYY-MM-DD'),
        "department": this.formdata.department,
        "request_type": this.formdata.request_type,
        "contractor_name": this.formdata.contractor_name,
        "vehicle_number": this.formdata.vehicle_number,
        "receiver_name": this.formdata.receiver_name,
        "contact_number": this.formdata.contact_number,
        "material_code": this.tabledata.mat_code,
        "material_description": this.tabledata.mat_desc,
        "unit_of_measurement": this.tabledata.uom,
        "quantity": this.tabledata.quantity,
        "date": moment(this.formdata.posting_date).format('YYYY-MM-DD')
      }
      this.custservice.addVendorBunkReqData(obj).subscribe((res: any) => {
        if(res && res['status_code']==200){
          console.log(res);
          Swal.fire({
            text: res['message'],
            title: res['reference'],
            icon: 'success',
            width: 500,
          });
          fr.reset();
          this.formdata = {};
          this.tabledata = {};
          this.getVendorBunkRequestListData();
          this.btnSaveUpdate = "Save"
        }
      })
     
    }
  
  }

  editBunkReqdata(rw: any,data:any) {
this.dialog.open(data,{
  width:'400px'
})
    
    this.editNumber = rw.number
  }

  editItem(){
    let obj = {
      "command" : "mat",
      "number" : this.editNumber
    }
    this.custservice.editVendorBunkRequest(obj).subscribe((res:any)=>{
      console.log(res)
      this.editableData = res.data[0];
      this.formdata.company_name = this.editableData.company_name;
      this.formdata.company_code = this.editableData.company_code;
      this.formdata.vendor_name = this.editableData.vendor_name;
      this.formdata.vendor_code = this.editableData.vendor_code;
      this.formdata.purchase_order_number = this.editableData.purchase_order_number;
      this.formdata.Purchase_Order_Date = moment(this.editableData.purchase_order_date).format('YYYY-MM-DD');
      this.formdata.department = this.editableData.department
      this.formdata.request_type = this.editableData.request_type;
      this.formdata.contractor_name = this.editableData.contractor_name;
      this.formdata.vehicle_number = this.editableData.vehicle_number;
      this.formdata.receiver_name = this.editableData.receiver_name;
      this.formdata.contact_number = this.editableData.contact_number;
      this.formdata.posting_date = moment(this.editableData.date).format('YYYY-MM-DD')
      this.tabledata.mat_desc = this.editableData.material_description;
      this.tabledata.mat_code = this.editableData.material_code;
      this.tabledata.uom = this.editableData.unit_of_measurement;
      this.tabledata.quantity = this.editableData.quantity;
      this.dialog.closeAll();
      this.demo1TabIndex = 0;
      this.btnSaveUpdate = "Update"
      
    })
  }
  printvbr(data:any){
    console.log(data.number);
    this.router.navigate(["/fuel-inventory/print-bunk-req"], {
      queryParams: { number: data.number },
    });
  }
  openfileuploadmodel(data:any,row1:any){
    this.dialog.open(data,{
      width:'800px'
    })
    this.vbrnumber=row1.number
    this.getexistingfiles()
  }
  getexistingfiles(){
    let params = new HttpParams();
    params = new HttpParams()
     .set("document_number", this.vbrnumber)
     .set( "document_type","Vendor Bunk Request")
    // let obj={
    //   "document_number" : this.dmrnumber,
    //   "document_type": "Daily Material Receipt"
    // }
    this.custservice.getexistingfies(params).subscribe((res:any)=>{
  if(res&&res['status_code']=='200'){
this.filedata=res.data
this.createNewFile.fileName=''
}else{
  this.filedata=''
  console.log(this.filedata);
}
    })
  }
  viewDoc(file: any) {
    const url = this.imageUrl + '/' + file.file_path;
    window.open(url, '_blank');
  }
  deleterowfile(row:any,data:any){
    this.deleteid=data.id
    this.dialogRef=this.dialog.open(row,{
      width:"400px"
    })
  }
  deleteexistingfile(){ 
    let params=new HttpParams()
    params=new HttpParams()
    .set("document_number", this.vbrnumber,)
     .set( "document_type","Vendor Bunk Request")
     .set( "id",this.deleteid)
     this.custservice.deletefiles(params).subscribe((res:any)=>{
      if(res&&res['status_code']=='200'){
        this.alertcall.showSuccess("Accepted","File Deleted Successfully")
        this.getexistingfiles()
        this.dialogRef.close()
      }else{
        this.alertcall.showWarning("Error",res['message'])
       
        
       
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
      for(const file of this.fileUploadUrls){
        this.filenamearray.push(file.name)
      }
      
    }
    console.log(this.fileUploadUrls);
    const postData = new FormData();
    postData.append("document_type","Vendor Bunk Request");
    postData.append("document_number",this.vbrnumber);
    for(const file of this.fileUploadUrls){
      postData.append("doc",file)
    }
    
    
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
this.alertcall.showSuccess("Accepted",res['message'])
this.getexistingfiles()
this.filenamearray=[]
this.fileUploadUrls=[]
}else{
  this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  uploadvbrfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsvbr = fileInput.target.files;
      for (const file of this.fileUploadUrlsvbr) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }
    }
  //  this.uploadingselectedfiles()
  }
  uploadingselectedfiles(){
    const postData = new FormData();
    postData.append("document_type","Work Order");
    postData.append("document_number",this.resultvbrnumber);
    for (const file of this.selectedfiles) {
      postData.append('doc', file);
    }
    // postData.append("doc",this.fileUploadUrlspo)
    
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
// this.alertcall.showSuccess("Accepted",res['message'])
this.fileUploadUrlsvbr=[]
this.selectedfiles=[]
this.filenamearray1=[]
}else{
  // this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  closemodel(){
    this.dialog.closeAll()
  }
  deleteBunkReqData(data: any, rw: any) {
    this.dialog.open(data, {
      width: "400px",
    });
    this.deleteNumber = rw.number;
    console.log(this.deleteNumber)
    // console.log(rw, data)
  }

  deleteItem() {
    let obj = {
      "command": "del",
      "number": this.deleteNumber,
    }
    this.custservice.deletevendorBunkRequest(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.getVendorBunkRequestListData();
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }
    //activity log
    getlogdata() {
      let obj = {
        command: "log",
        key: "VendorBunkRequest"
      }
      this.custservice.getActivityLog(obj).subscribe((res: any) => {
        if (res.log.length > 0) {
          this.logdata = res.log
        }
      })
    }
}

