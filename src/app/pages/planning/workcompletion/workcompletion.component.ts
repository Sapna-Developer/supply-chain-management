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
  selector: 'app-workcompletion',
  templateUrl: './workcompletion.component.html',
  styleUrls: ['./workcompletion.component.scss']
})
export class WorkcompletionComponent implements OnInit {
  fileUploadUrls: any[]=[]
  fileUploadUrlswc:any[]=[]
  filenamearray:any[]=[]
  filenamearray1:any[]=[]
  selectedfiles:any[]=[]
  wcnumber: any;
  filedata: any;
  deleteid: any;
  dialogRef:any=null;
  workorderdata: any;
  resultwcnumber: any;
  editednumber: any;
  editdataa: any;
  demo1TabIndex:any=0
  btn:any="Save"
  logdata: any;
  editModel:any={}
  deletemodel:any={}
  constructor(
    private custservice: CustomerService, private dialog: MatDialog,
    private alertcall: AlertCallsService,public overlay: Overlay,
    private injector:Injector,private router:Router, private route:ActivatedRoute
  ) {this.dialogRef = this.injector.get(MatDialogRef, null);} 

  dataSourceList = new MatTableDataSource();

  displayedColumnsList: any[] = [
    'sno', 'date', 'companyname', 'location', 'address', 'contractor_name', 'work_order_number', 'work_order_date', 'contract_duration',
    'brief_description_of_work', 'work_completion_date', 'retention_release_recommendation', 'retention_release_clearance', 'number',
    'financial_year', 'serial', 'action'
   ]


  formdata:any={}
  companyname:any
  companyData:any
  duration:any
  location:any
  description:any;
  address:any
  wcrdate:any
  date:any
  contractor:any
  wowarranty:any
  retention:any
  clearence:any
  wodate:any;
  wonumber:any
  deleteNumber:any
  pageIndex: any = 1;
  pageSize: any = 10;
  totalRecords: any = 0;
  reaData: boolean;
  contractorData:any;
  WOdata:any
  createNewFile:any={}
  imageUrl=environment.base_url
  initialdata:any=true;
  secondarydata:any=false;
  openfileuploadmodel(data:any,row1:any){
    this.dialog.open(data,{
      width:'800px'
    })
    this.wcnumber=row1.number
    this.getexistingfiles()
  }
  getexistingfiles(){
    let params = new HttpParams();
    params = new HttpParams()
     .set("document_number", this.wcnumber,)
     .set( "document_type","Work Completion")
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
    .set("document_number", this.wcnumber,)
     .set( "document_type","Work Completion")
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
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for(const file of this.fileUploadUrls){
        this.filenamearray.push(file.name)

      }
    }
    const postData = new FormData();
    postData.append("document_type","Work Completion");
    postData.append("document_number",this.wcnumber);
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
  uploadwcfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlswc = fileInput.target.files;
      this.createNewFile.fileName = fileInput.target.files[0].name;
      for(const file of this.fileUploadUrlswc){
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)

      }
    }
  }
  uploadselectedfiles(){
    const postData = new FormData();
    postData.append("document_type","Work Completion");
    postData.append("document_number",this.resultwcnumber);
    for(const file of this.selectedfiles){
      postData.append("doc",file)
    }
   
   
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
  this.filenamearray1=[]
  this.selectedfiles=[]
this.fileUploadUrlswc=[]
}else{
 
}
    })
  }
  getwcrlistdata(){
    let obj = {
      "command": "lst",
      "lmt": this.pageSize,
      "pid": this.pageIndex
    }
    this.custservice.getWCRlistData(obj).subscribe((res: any) => {
      this.reaData = false;
      this.totalRecords = res?.count;
      this.dataSourceList.data = res.data
      if (res.data.length == 0) {
        this.reaData = true
      }
    })
    console.log(this.totalRecords);
  }

  deletewcrdata(rw: any, data: any){
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
    this.custservice.deleteWCRData(obj).subscribe((res: any) => {
      console.log(obj);
      if (res && res['status_code'] == "200") {
        this.alertcall.showSuccess('Accepted', res['message']);
        this.dialog.closeAll()
        this.deletemodel.reason=""
        this.getwcrlistdata()
        this.getlogdata()
      } else {
        this.alertcall.showWarning('Error', res['message']);
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
  getcontractorData(){
    let obj={
      "command" : "lst"
    }
    this.custservice.getcontractormasterdata(obj).subscribe((res:any)=>{
      this.contractorData = res.data
    })
  }
  getworkorderlistData() {
    let obj = {
      command:'wol'
    }
    this.custservice.getWCRlistData(obj).subscribe((res: any) => {
     console.log(res)
     this.WOdata = res.message
    })
  }
  validateNumber(e: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = e.target.value + String.fromCharCode(e.charCode);

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }
  savefinaldata(){
    if(this.btn==="Save"){
    let obj={
      "command":"add",
      "company_name" : this.formdata.companyname,
      "date" : moment(this.formdata.date).format("YYYY-MM-DD"),
      "location" : this.formdata.location,
      "address" : this.formdata.address,
      "contractor_name" : this.formdata.contractor,
      "work_order_number" : this.formdata.wonumber,
      "work_order_date" : moment(this.formdata.wodate).format("YYYY-MM-DD"),
      "contract_duration" : this.formdata.duration,
      "brief_description_of_work" : this.formdata.description,
      "work_completion_date" : moment(this.formdata.wcrdate).format("YYYY-MM-DD"),
      "warranty_period_of_work_order" : this.formdata.wowarranty,
      "retention_release_recommendation" : this.formdata.retention,
      "retention_release_clearance" : this.formdata.clearence
    }
    this.custservice.addWCRdata(obj).subscribe((res: any) => {
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
        this.initialdata=true;
        this.secondarydata=false;
        this.formdata.wonumber=""
        this.getwcrlistdata()
        this.getlogdata()
        this.resultwcnumber=res['reference']
        if(this.fileUploadUrlswc.length > 0){
          this.uploadselectedfiles()
        }
       
      } else {
        this.alertcall.showWarning('Accepted', res['message']);
        // fr.reset();
      }
    })
  }else{
    let obj={
      "reason": this.editModel.reason,
      "command":"edt",
      "number":this.editednumber,
      "company_name" : this.formdata.companyname,
      "date" : moment(this.formdata.date).format("YYYY-MM-DD"),
      "location" : this.formdata.location,
      "address" : this.formdata.address,
      "contractor_name" : this.formdata.contractor,
      "work_order_number" : this.formdata.wonumber,
      "work_order_date" : moment(this.formdata.wodate).format("YYYY-MM-DD"),
      "contract_duration" : this.formdata.duration,
      "brief_description_of_work" : this.formdata.description,
      "work_completion_date" : moment(this.formdata.wcrdate).format("YYYY-MM-DD"),
      "warranty_period_of_work_order" : this.formdata.wowarranty,
      "retention_release_recommendation" : this.formdata.retention,
      "retention_release_clearance" : this.formdata.clearence
    }
    this.custservice.addWCRdata(obj).subscribe((res: any) => {
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
        this.initialdata=true;
        this.secondarydata=false;
        this.formdata.wonumber=""
        this.getwcrlistdata()
        this.getlogdata()
        this.editModel.reason=""
        this.resultwcnumber=this.editednumber
        if(this.fileUploadUrlswc.length > 0){
          this.uploadselectedfiles()
        }
        this.btn=="Save"
      } else {
        this.alertcall.showWarning('Accepted', res['message']);
        // fr.reset();
      }
    }) 
  }
  }
  ngOnInit(): void {
    this.formdata.wcrdate=moment(new Date()).format("YYYY-MM-DD")
    this.formdata.date=moment(new Date()).format("YYYY-MM-DD")
    this.formdata.wodate=moment(new Date()).format("YYYY-MM-DD")
    this.getwcrlistdata();
    this.getcompanydata();
    this.getcontractorData();
    this.getworkorderlistData();
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
  printworkcompletion(data:any){
    this.router.navigate(['/planning/printwc'],{ queryParams: {'wcnumber': data.number}})

  }
  getlogdata(){
    let obj={
      command:"log",
      key:"WorkCompletionReport"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
      if(res.log.length > 0){
      this.logdata=res.log
      }
    })
  }
  selectedwonumber(){
    let obj={
      command:"mat",
      key:this.formdata.wonumber
    }
    this.custservice.addworkorderdata(obj).subscribe((res:any)=>{
      this.workorderdata=res.data[0]
      this.formdata.companyname=this.workorderdata.company_name
      this.formdata.wodate=moment(this.workorderdata.date).format("YYYY-MM-DD")
      this.formdata.contractor=this.workorderdata.contractor_name
      this.formdata.description=this.workorderdata.subject
      this.initialdata=false;
      this.secondarydata=true;
    })
  }
  backtoprevious(){
    this.initialdata=true;
    this.secondarydata=false;
  }
  editworkcompletiondata(data:any,dialog:any){
    this.dialog.open(dialog,{
      width:"400px"
    })
    this.editednumber=data.number
  }
  saveeditreason(){
    let obj={
      command: "mat",
      // field: "number",
      number: this.editednumber,
    }
    this.custservice.addWCRdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.dialog.closeAll();
     this.editdataa=res.message[0]
     this.formdata.companyname=this.editdataa.company_name,
      this.formdata.date=moment(this.editdataa.date).format("YYYY-MM-DD"),
     this.formdata.location=this.editdataa.location,
      this.formdata.address=this.editdataa.address,
     this.formdata.contractor=this.editdataa.contractor_name,
      this.formdata.wonumber=this.editdataa.work_order_number,
      this.formdata.wodate=moment(this.editdataa.work_order_date).format("YYYY-MM-DD"),
       this.formdata.duration=this.editdataa.contract_duration,
      this.formdata.description=this.editdataa.brief_description_of_work,
      this.formdata.wcrdate=moment(this.editdataa.work_completion_date).format("YYYY-MM-DD"),
      this.formdata.wowarranty=this.editdataa.warranty_period_of_work_order,
     this.formdata.retention=this.editdataa.retention_release_recommendation,
      this.formdata.clearence=this.editdataa.retention_release_clearance
      this.initialdata=false;
      this.secondarydata=true;
      this.demo1TabIndex=0;
      this.btn="Update"
    })
  }
}
