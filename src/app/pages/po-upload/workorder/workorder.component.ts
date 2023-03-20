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
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.scss']
})
export class WorkorderComponent implements OnInit {
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
  fileUploadUrls: any[]=[]
  WOnumber: any;
  filedata: any;
  deleteid: any;
  dialogRef:any=null
  resultwonumber: any;
  editednumber: any;
  editModel:any={}
  editdataa: any;
  initialdata:any=true;
  logdata: any;
  selectedcontractorname: any;
  documnet_nodata: any;
  constructor(
    private custservice:CustomerService,private dialog: MatDialog,
    private alertcall: AlertCallsService,public overlay: Overlay,private injector:Injector,
    private router:Router, private route:ActivatedRoute
  ) {  this.dialogRef = this.injector.get(MatDialogRef, null);}

  dataSourceList = new MatTableDataSource()

  displayedColumnsList: any[] = [
    'sno', 'number', 'date', 'companyname', 'servicedescription', 'action'
  ]

  formdata:any={}
  dialogdata:any={}
  model:any={}
  companyData:any
  contractorData:any;
  companyname:any;
  contractor:any;
  date:any;
  comments:any;
  subject:any;
  formquantity:any;
  conditions:any;
  uom:any
  servicedescription:any;
  servicecode:any;
  unitprice:any;
  wrnumber:any;
  taxdescription:any;
  taxprcnt:any;
  reaData:boolean;
  pageSize:any=10;
  pageIndex:any=1;
  totalRecords:any;
  deleteNumber:any
  servicemasterData:any
  selectedservicemaster:any;
  taxData:any
  selectedtaxmaster:any
  WRdata:any
  selectedWRdata:any
  dialogdataArray:any[]=[]
  tabledata:any;
  boqitemdes:any[]=[]
  boquom:any[]=[]
  boqquantity:any[]=[]
  boqunitprice:any[]=[]
  wrboqid:any[]=[]
  boqitemremarks:any[]=[]
  totalprice:any
  WRtabledetials:any[]=[]
  WRdatadetials:any[]=[]
  WRdatadetialsss:any[]=[]
  line_item:any;
  wr_number:any
  item_description:any;
  unit_of_measurment:any;
  unit_price:any;
  quantity1:any;
  total_amount:any;
  formdetails:any[]=[]
  wonumber:any;
  WOlistt:any;
  formwonumber:any;
  boqItemremarks:any[]=[]
  boqitemdescription:any[]=[]
  boqUOM:any[]=[]
  BOQquantity:any[]=[]
  WRBOQ:any[]=[]
  BOQunitprice:any[]=[]
  BOQlineitem:any[]=[]
  createNewFile:any={}
  imageUrl=environment.base_url
  fileUploadUrlswo:any[]=[]
  selectedfiles:any[]=[]
  filenamearray:any[]=[]
  filenamearray1:any[]=[]
  demo1TabIndex:any=0;
  btn:any="Save"
  deletemodel:any={}
  calctotalprice(){
    this.formdata.totalprice = (this.formdata.formquantity||1) * (this.formdata.unitprice||1)
    
  }
//   unitpricee(ev:any){
// console.log(ev.target.value);

//   }
  calctotalamount(){
  //   this.gettabledataDetails();
  //  this.model.total_amount = this.model.quantity * this.model.unit_price
  //  console.log(this.model.unit_price, this.model.quantity)
  //   console.log(this.model.total_amount);
    this.WRdatadetialsss.forEach((ele:any)=>
    {
      console.log(ele)
      ele.total_amount = ele.unit_price * ele.quantity
    }
    )
  }
  getcompanydata() {
    let obj = {
      "command": "lst",
      lmt:100000,
      pid:1
    };
    this.custservice.getcompanymasterdata(obj).subscribe((res: any) => {
      this.companyData = res.data;
    });
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
  addworkorderdata(data:any){
    this.dialog.open(data,{
      width:'650px'
    })
  }
  closedialogdata(){
    this.dialog.closeAll()
  }
  binddatatotable(){
    this.gettabledataDetails();
    this.dialogdata={}
    this.dialog.closeAll();
  }
  getworkorderlistData() {
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex
    }
    this.custservice.getWOlistData(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }

  WOlist() {
    let obj = {
      "command": "lst",
    }
    this.custservice.getWOlistData(obj).subscribe((res: any) => {
     this.WOlistt = res.data
    })
  }
  onpageevent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getworkorderlistData()
  }
  deleteworkorderdata(rw: any, data: any){
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
      "reason":this.deletemodel.reason
    }
    this.custservice.deleteworkOrderdata(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.getworkorderlistData()
        this.getlogdata()
      } else {
        this.alertcall.showWarning('Error', res['message']);
      }
    })
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
      "key": this.selectedservicemaster
    }
    this.custservice.getServiceMasterData(obj).subscribe((res: any) => {
      console.log(res.data)
      this.servicemasterData = res.data
      console.log(this.servicemasterData)

    })
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
    console.log(this.formdata.servicedescription)
    this.servicemasterData.forEach((ele: any) => {
      if (ele.description == this.formdata.servicedescription) {
        this.formdata.uom = ele.unit_of_measurment
        this.formdata.servicecode = ele.code
        this.model.unit_of_measurment = ele.unit_of_measurment
      }
    });
  }
  getTaxlistdata(){
    let obj={
      "command" : "lst",
      "key": this.selectedtaxmaster

    }
    this.custservice.gettaxlistdata(obj).subscribe((res:any)=>{
      this.taxData = res.data
      console.log(this.taxData)
    })
  }
  filtetaxdata(ev: any) {
    console.log(ev.target.value);
    this.selectedtaxmaster = ev.target.value
    if (this.selectedtaxmaster.length > 2) {
      this.getTaxlistdata()
    }
    if (!this.selectedtaxmaster) {
      this.getTaxlistdata()
    }
  }
  selectedtaxpercent() {
    console.log(this.formdata.taxdescription)
    this.taxData.forEach((ele: any) => {
      if (ele.description == this.formdata.taxdescription) {
        this.formdata.taxprcnt = ele.percentage
       
      }
    });
    this.formdata.taxvalue=(this.formdata.unitprice||1)*(this.formdata.formquantity||1)*(this.formdata.taxprcnt||1)*0.01
  }
  selectedunitprice(){
    this.formdata.taxvalue=(this.formdata.unitprice||1)*(this.formdata.formquantity||1)*(this.formdata.taxprcnt||1)*0.01
  }
  getworkrequestlistData(){
    let obj={
      "command" : "wrl",
      "key": this.selectedWRdata||""
    }
    this.custservice.getWRdropdownData(obj).subscribe((res:any)=>{
      this.WRdata = res.data
    })
  }
  filteWRdata(ev: any) {
    console.log(ev.target.value);
    this.selectedWRdata = ev.target.value
    if (this.selectedWRdata.length > 2) {
      this.getworkrequestlistData()
    }
    if (!this.selectedWRdata) {
      this.getworkrequestlistData()
    }
  }
  selectedWR() {
    console.log(this.dialogdata.wrnumber)
    this.WRdata.forEach((ele: any) => {
      console.log(ele)
      if (ele.number == this.dialogdata.wrnumber) {
        this.formdata.formwrnumber = ele.number
       
      }
    });
  }
  gettabledataDetails(){
    this.WRdatadetialsss=[]
    let obj ={
      "command" : "set",
      "wr_number" : this.dialogdata.wrnumber
    }
    this.custservice.gettabledatalist(obj).subscribe((res:any)=>{
     console.log(obj)
     console.log(res)
     this.WRdatadetials = res.table
     console.log(this.WRdatadetials)
     this.WRtabledetials.forEach((list:any)=>{
      list['wr_number'] = this.model.wr_number;
      list['line_item'] = this.model.line_item;
      list['item_description']=this.model.item_description;
      list['quantity']=this.model.quantity;
      list['total_amount']=this.model.total_amount;
      list['unit_of_measurment']=this.model.unit_of_measurment;
      list['unit_price']=this.model.unit_price
     })
     this.WRdatadetials.forEach((ele: any) => {
      this.WRdatadetialsss.push(ele);
    });
    console.log(this.WRdatadetialsss);
   this.formdetails = res.data
   console.log(this.formdetails)
    this.formdetails.forEach((form:any)=>{
      this.formdata.companyname = form.company_name
      this.formdata.wrnumber = form.number
      this.formdata.date = moment(form.date).format("YYYY-MM-DD")
      this.formdata.servicecode = form.service_code
      this.formdata.servicedescription = form.service_description
      this.formdata.uom = form.unit_of_measurment
      this.formdata.formquantity = form.quantity
      this.formdata.unitprice = form.unit_price.toFixed(2)
      this.formdata.totalprice = form.total_price
    })
    })    
  }
  savefinaldata(fr:any){
    if(this.btn==="Save"){
    this.WRdatadetialsss.forEach((val:any)=>{
      console.log(val)
      this.boqItemremarks.push(val.item_remarks),
      this.boqitemdescription.push(val.item_description)
      this.boqUOM.push(val.unit_of_measurment)
      this.BOQquantity.push(val.quantity)
      this.WRBOQ.push(val.line_item)
      this.BOQunitprice.push(val.unit_price)
      this.BOQlineitem.push(val.line_item)

    })
    let obj={
     
      "command" : "add",
      "comments":this.formdata.comments,
      "date":  moment(this.formdata.date).format("YYYY-MM-DD"),
      "number" : this.formdata.wonumber,
      "company_name" : this.formdata.companyname,
      "contractor_name" : this.formdata.contractor,
      "subject" : this.formdata.subject,
      "service_code" : this.formdata.servicecode,
      "service_description" : this.formdata.servicedescription,
      "unit_of_measurment" : this.formdata.uom,
      "quantity" : this.formdata.formquantity,
      "unit_price" : this.formdata.unitprice,
      "tax_description" : this.formdata.taxdescription,
      "tax_percent" : this.formdata.taxprcnt,
      "tax_value" : this.formdata.taxvalue,
      "conditions" : this.formdata.conditions,
      "wr_number" : this.formdata.formwrnumber,
      "boq_item_remarks" : this.boqItemremarks,
      "boq_item_description" : this.boqitemdescription,
      "boq_unit_of_measurment" : this.boqUOM,
      "boq_quantity" : this.BOQquantity,
      "wr_boq_id" :  this.WRBOQ,
      "boq_unit_price" : this.BOQunitprice,
      "line_item" : this.BOQlineitem
    }
    this.custservice.addworkorderdata(obj).subscribe((res: any) => {
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
       this.WRdatadetialsss=[]
       this.boqItemremarks=[]
      this.boqitemdescription=[]
      this.boqUOM=[]
      this.BOQquantity=[]
      this.WRBOQ=[]
      this.BOQunitprice=[]
      this.BOQlineitem=[]
      this.getlogdata()
      this.getworkorderlistData()
       this.resultwonumber=res['reference']
       if(this.fileUploadUrlswo.length > 0){
        this.uploadingselectedfiles()
       }
       
      } else {
        this.alertcall.showWarning('Accepted', res['message']);
        this.boqItemremarks=[]
       this.boqitemdescription=[]
       this.boqUOM=[]
       this.BOQquantity=[]
       this.WRBOQ=[]
       this.BOQunitprice=[]
       this.BOQlineitem=[]
        
      }
    })
  }else{
    this.WRdatadetialsss.forEach((val:any)=>{
      console.log(val)
      this.boqItemremarks.push(val.item_remarks),
      this.boqitemdescription.push(val.item_description)
      this.boqUOM.push(val.unit_of_measurment)
      this.BOQquantity.push(val.quantity)
      this.WRBOQ.push(val.line_item)
      this.BOQunitprice.push(val.unit_price)
      this.BOQlineitem.push(val.line_item)

    })
    let obj={
      "reason": this.editModel.reason,
      "command" : "edt",
      "wo_number":this.editednumber,
      "comments":this.formdata.comments,
      "date":  moment(this.formdata.date).format("YYYY-MM-DD"),
      // "number" : this.formdata.wonumber,
      "company_name" : this.formdata.companyname,
      "contractor_name" : this.formdata.contractor,
      "subject" : this.formdata.subject,
      "service_code" : this.formdata.servicecode,
      "service_description" : this.formdata.servicedescription,
      "unit_of_measurment" : this.formdata.uom,
      "quantity" : this.formdata.formquantity,
      "unit_price" : this.formdata.unitprice,
      "tax_description" : this.formdata.taxdescription,
      "tax_percent" : this.formdata.taxprcnt,
      "tax_value" : this.formdata.taxvalue,
      "conditions" : this.formdata.conditions,
      "wr_number" : this.formdata.formwrnumber,
      "boq_item_remarks" : this.boqItemremarks,
      "boq_item_description" : this.boqitemdescription,
      "boq_unit_of_measurment" : this.boqUOM,
      "boq_quantity" : this.BOQquantity,
      "wr_boq_id" :  this.WRBOQ,
      "boq_unit_price" : this.BOQunitprice,
      "line_item" : this.BOQlineitem
    }
    this.custservice.addworkorderdata(obj).subscribe((res: any) => {
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
       this.WRdatadetialsss=[]
       this.WRdatadetialsss=[]
       this.boqItemremarks=[]
      this.boqitemdescription=[]
      this.boqUOM=[]
      this.BOQquantity=[]
      this.WRBOQ=[]
      this.BOQunitprice=[]
      this.BOQlineitem=[]
      this.getlogdata()
      this.getworkorderlistData()
      this.editModel.reason=""
       this.resultwonumber=this.editednumber
       if(this.fileUploadUrlswo.length > 0){
        this.uploadingselectedfiles()
       }
       this.btn="Save"
       this.initialdata=true;
      } else {
        this.alertcall.showWarning('Accepted', res['message']);
        this.boqItemremarks=[]
       this.boqitemdescription=[]
       this.boqUOM=[]
       this.BOQquantity=[]
       this.WRBOQ=[]
       this.BOQunitprice=[]
       this.BOQlineitem=[]
        
      }
    })  
  }
  }
 
  openfileuploadmodel(data:any,row1:any){
    this.dialog.open(data,{
      width:'800px'
    })
    this.WOnumber=row1.number
    this.getexistingfiles()
  }
  getexistingfiles(){
    let params = new HttpParams();
    params = new HttpParams()
     .set("document_number", this.WOnumber)
     .set( "document_type","Work Order")
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
    .set("document_number", this.WOnumber,)
     .set( "document_type","Work Order")
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
    postData.append("document_type","Work Order");
    postData.append("document_number",this.WOnumber);
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
  uploadwofiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlswo = fileInput.target.files;
      for (const file of this.fileUploadUrlswo) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }
    }
  //  this.uploadingselectedfiles()
  }
  uploadingselectedfiles(){
    const postData = new FormData();
    postData.append("document_type","Work Order");
    postData.append("document_number",this.resultwonumber);
    for (const file of this.selectedfiles) {
      postData.append('doc', file);
    }
    // postData.append("doc",this.fileUploadUrlspo)
    
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
// this.alertcall.showSuccess("Accepted",res['message'])
this.fileUploadUrlswo=[]
this.selectedfiles=[]
this.filenamearray1=[]
}else{
  // this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  ngOnInit(): void {
    this.formdata.date=moment(new Date()).format("YYYY-MM-DD")
    this.getcompanydata();
    this.getcontractorData();
    this.getworkorderlistData();
    this.getsrvcMasterData();
    this.getTaxlistdata();
    this.getworkrequestlistData();
    // this.gettabledataDetails();
    this.WOlist();
    this.getlogdata()
    this.route.queryParams.subscribe((params:any) => {
       
      if(params.tab=='notifications'){
        this.demo1TabIndex=1;
        console.log(params);
        
      }
    else{
      this.demo1TabIndex=0;
    }
    })
  }
  getlogdata(){
    let obj={
      command:"log",
      key:"WorkOrder"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
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
  editwodata(data:any,dialog:any){
    this.dialog.open(dialog,{
      width:"400px"
    })
    this.editednumber=data.number
    this.initialdata=false;
  }
  saveeditreason(){
    let obj={
      command: "mat",
      // field: "number",
      key: this.editednumber,
    }
    this.custservice.addworkorderdata(obj).subscribe((res:any)=>{
      this.dialog.closeAll()
      console.log(res);
     this.editdataa=res.data[0]
     this.WRdatadetialsss = res.table
     console.log(this.WRdatadetials)
     this.WRdatadetialsss.forEach((list:any)=>{
      list['wr_number']=this.editdataa.wr_number
      // list['wr_number'] = this.model.wr_number;
      // list['line_item'] = this.model.line_item;
      // list['item_description']=this.model.item_description;
      // list['quantity']=this.model.quantity;
      // list['total_amount']=this.model.total_amount;
      // list['unit_of_measurment']=this.model.unit_of_measurment;
      // list['unit_price']=this.model.unit_price
     })
      // this.WRdatadetialsss=this.WRdatadetials
 
     this.formdata.comments=this.editdataa.comments,
     this.formdata.date=moment(this.editdataa.date).format("YYYY-MM-DD"),
      this.formdata.wonumber=this.editdataa.wr_number,
      this.formdata.companyname=this.editdataa.company_name,
      this.formdata.contractor=this.editdataa.contractor_name,
      this.formdata.subject=this.editdataa.subject,
      this.formdata.servicecode=this.editdataa.service_code,
      this.formdata.servicedescription=this.editdataa.service_description,
      this.formdata.uom=this.editdataa.unit_of_measurment,
      this.formdata.formquantity=this.editdataa.quantity,
       this.formdata.unitprice=this.editdataa.unit_price,
      this.formdata.taxdescription=this.editdataa.tax_description,
      this.formdata.taxprcnt=this.editdataa.tax_percent,
       this.formdata.conditions=this.editdataa.conditions,
       this.formdata.formwrnumber=this.editdataa.wr_number,
     this.formdata.totalprice=this.editdataa.total_price
      
      this.demo1TabIndex=0;
      this.btn="Update"
    
    })
  }
  printwo(data: any) {
    console.log(data.number);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "dmrnumber": data.number
    //   }
    // };
    this.router.navigate(["/cp/printwo"], { queryParams: {'wonumber': data.number}}
    );
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
    document_name: "WorkOrder",
    document_number:this.documnet_nodata
  };
  this.custservice.AutoDocUpdate2(obj).subscribe((res: any) => {
    if(res && res['status_code']==200){
      this.dialog.closeAll()
      this.alertcall.showSuccess("Accepted", res['message'])
      this.getworkorderlistData()
    } else {
      this.dialog.closeAll()
      this.alertcall.showWarning("Error", res['message'])
    }      
  });
}
}
