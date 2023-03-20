import { HttpParams } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-siterecomendationsheet',
  templateUrl: './siterecomendationsheet.component.html',
  styleUrls: ['./siterecomendationsheet.component.scss']
})
export class SiterecomendationsheetComponent implements OnInit {
  displayedColumns:any[]=[
    'lineItem',
    'serviceCode',
    'serviceDescription',
    'uom',
    'unitPrice',
    'Quantity',
    'taxdescription',
    'TaxPercentage',
    'TaxValue',
    'TotalValue',
    'action'
  ]
  displayedColumnsList:any[]=[
    'sno',
    'number',
    'date',
    'company_name',
    'work_order_number',
    'ra_bill_number',
    'action'
  ]
  companyData: any;
  masterData: any;
  dialogdata:any={}
  editeddialogdata:any={}
  serviceCODE: any;
  serviceNAME: any;
  taxData: any;
  formdatatotablearray:any[]=[]
  dataSource = new MatTableDataSource();
  dataSourceList=new MatTableDataSource()
  selectedIndex = -1;
  systemref: any;
  SNO:any[]=[]
  matCode:any[]=[]
  matName:any[]=[]
  UOM:any[]=[]
  UnitPrice:any[]=[]
  Quantity:any[]=[]
  TaxDescription:any[]=[]
  TaxPercentage:any[]=[]
  formdata:any={}
  reaData: boolean;
  totalRecords: any;
  pageSize:any=10;
  pageIndex:any=1;
  deleteNumber: any;
  selectedservice: any;
  selectedserviceedit: any;
  srsnumber: any;
  filedata: any;
  createNewFile:any={}
  imageUrl=environment.base_url
  deleteid: any;
  dialogRef:any=null
  fileUploadUrls: any[]=[]
  fileUploadUrlssrs:any[]=[]
  filenamearray:any[]=[]
  filenamearray1:any[]=[]
  selectedfiles:any[]=[]
  demo1TabIndex:any=0;
  resultsrsnumber: string | Blob;
  editednumber: any;
  logdata: any;
  editdataa: any;
  btn:any="Save"
  deletemodel:any={}
  editModel:any={}
  woList: any;
  selectedwonumber: any;
  WODATA: any;
  initialdata:any=true;
  secondarydata:any=false;
  constructor(private custservice:CustomerService,private dialog:MatDialog,
    private alertcall:AlertCallsService,private injector:Injector,
    private router:Router,private route:ActivatedRoute) { 
      this.dialogRef = this.injector.get(MatDialogRef, null);
    }

  ngOnInit(): void {
    this.formdata.wodate=moment(new Date()).format("YYYY-MM-DD")
    this.formdata.rafromdate=moment(new Date()).format("YYYY-MM-DD")
    this.formdata.ratodate=moment(new Date()).format("YYYY-MM-DD")
    this.route.queryParams.subscribe((params:any) => {
     
      if(params.tab=='notifications'){
        this.demo1TabIndex=1;
        console.log(params);
        
      }
    else{
      this.demo1TabIndex=0;
    }
    })
    this.getserviceDROPDOWN()
    this.getcompanydata()
    this.getTaxlistdata()
    this.getData()
    this.getlogdata()
    this.getworkorderlistData()
  }
  getwoDATA(ev:any){
    this.selectedwonumber=ev.target.value
    if(this.selectedwonumber.length>2){
this.getworkorderlistData()
    }
    if(!this.selectedwonumber){
      this.getworkorderlistData()
    }
  }
  getworkorderlistData() {
    let obj = {
      "command": "lst",
      "lmt": 100000,
      "pid": 1,
      "key": this.selectedwonumber || ""
    }
    this.custservice.getWOlistData(obj).subscribe((res: any) => {
     this.woList=res.data
    })
    
  }
  selectedWOnumber(){
let obj={
  command: "mat",
  key: "GEPPL/22-23/WO/017"
}
this.custservice.addworkorderdata(obj).subscribe((res:any)=>{
  this.WODATA=res.data[0]
  this.formdata.companyname=this.WODATA.company_name,
  this.formdata.description=this.WODATA.description_of_work,
  this.formdata.contractorname=this.WODATA.contractor_name,
  // this.formdata.wonumber=this.WODATA.work_order_number,
  this.formdata.wodate=moment(this.WODATA.work_order_date).format("YYYY-MM-DD"),
  this.formdata.wovalue=this.WODATA.work_order_value
  this.initialdata=false;
  this.secondarydata=true;
})
  }
  backtoprevious(){
    this.initialdata=true;
    this.secondarydata=false;
  }
  getlogdata(){
    let obj={
      command:"log",
      key:"SiteRecommendationSheet"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
      if(res.log.length > 0){
      this.logdata=res.log
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
  getTaxlistdata(){
    let obj={
      "command" : "lst",
     
    }
    this.custservice.gettaxlistdata(obj).subscribe((res:any)=>{
    this.taxData=res.data
    })
  }
  selectedtax(){
    this.taxData.forEach((el:any)=>{
      if(el.code==this.dialogdata.taxdescription){
        this.dialogdata.TaxPercent=el.percentage
      }
    })
  }
  selectedtaxedit(){
    this.taxData.forEach((el:any)=>{
      if(el.code==this.editeddialogdata.taxdescription){
        this.editeddialogdata.TaxPercent=el.percentage
      }
    })
  }
  selectedtds(){
    this.taxData.forEach((el:any)=>{
      if(el.code==this.formdata.tdsdesc){
        this.formdata.tdspercentage=el.percentage
      }
    }) 
  }
  selectedlabour(){
    this.taxData.forEach((el:any)=>{
      if(el.code==this.formdata.labourdesc){
        this.formdata.labourpercentage=el.percentage
      }
    }) 
  }
getserviceDROPDOWN(){
  let obj={
    "command":"lst",
    "lmt":100000,
    "pid":1,
    "key":this.selectedservice||this.selectedserviceedit
  }
  this.custservice.gerservicecodedropdown(obj).subscribe((res:any)=>{
   this.masterData=res.data
    
  })
}
openfileuploadmodel(data:any,row1:any){
  this.dialog.open(data,{
    width:'800px'
  })
  this.srsnumber=row1.number
  this.getexistingfiles()
}
getexistingfiles(){
  let params = new HttpParams();
  params = new HttpParams()
   .set("document_number", this.srsnumber,)
   .set( "document_type","Site Recommendation Sheet")
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
  .set("document_number", this.srsnumber,)
   .set( "document_type","Site Recommendation Sheet")
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
    for (const file of this.fileUploadUrls) {
      this.filenamearray.push(file.name)
     
    }
    
  }
  console.log(this.fileUploadUrls);
  const postData = new FormData();
  postData.append("document_type","Site Recommendation Sheet");
  postData.append("document_number",this.srsnumber);
  for (const file of this.fileUploadUrls) {
    postData.append("doc",file)
   
  }
  this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
this.alertcall.showSuccess("Accepted",res['message'])
this.getexistingfiles()
this.fileUploadUrls=[]
this.filenamearray=[]
}else{
this.alertcall.showWarning("Error",res['message'])
}
  })
}
uploadqsdfiles(fileInput: any) {
  if (
    fileInput &&
    fileInput.target &&
    fileInput.target.files &&
    fileInput.target.files.length > 0
  ) {
    this.fileUploadUrlssrs = fileInput.target.files;
    for (const file of this.fileUploadUrlssrs) {
      this.filenamearray1.push(file.name)
      this.selectedfiles.push(file)
    }
  }
//  this.uploadingselectedfiles()
}
uploadingselectedfiles(){
  const postData = new FormData();
  postData.append("document_type","Qsd Supply");
  postData.append("document_number",this.resultsrsnumber);
  for (const file of this.selectedfiles) {
    postData.append('doc', file);
  }
  // postData.append("doc",this.fileUploadUrlspo)
  
  this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
// this.alertcall.showSuccess("Accepted",res['message'])
this.fileUploadUrlssrs=[]
this.selectedfiles=[]
this.filenamearray1=[]
}else{
// this.alertcall.showWarning("Error",res['message'])
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
  this.custservice.getsiterecommendationsheet(obj).subscribe((res: any) => {
    this.reaData = false;
    this.totalRecords = res?.count;
    this.dataSourceList.data = res.data
    if (res.data.length == 0) {
      this.reaData = true
    }
  })
  console.log(this.totalRecords);
}
filterdata(ev:any){
  console.log(ev.target.value);
  this.selectedservice=ev.target.value
  if(this.selectedservice.length>2){
this.getserviceDROPDOWN()
  }
  if(! this.selectedservice){
    this.getserviceDROPDOWN()
  }
}
selectedserviceuom() {
  //console.log(this.dialogdata.matcode);
  this.masterData.forEach((ele: any) => {
    if (ele.system_reference_1 == this.dialogdata.servicecode) {
      this.dialogdata.uom = ele.unit_of_measurment
      this.serviceCODE = ele.code
      this.serviceNAME = ele.name
    }
  });
  // this.getSMSdata()
}
selectedserviceuomedit(){
  this.masterData.forEach((ele: any) => {
    if (ele.system_reference_1 == this.editeddialogdata.servicecode) {
      this.editeddialogdata.uom = ele.unit_of_measurment
      this.serviceCODE = ele.code
      this.serviceNAME = ele.name
    }
  });
}
editfilterdata(ev:any){
  console.log(ev.target.value);
  this.selectedserviceedit=ev.target.value
  if(this.selectedserviceedit.length>2){
this.getserviceDROPDOWN()
  }
  if(! this.selectedserviceedit){
    this.getserviceDROPDOWN()
  }
}

addservicedata(data: any) {
  this.dialog.open(data, {
    width: '1100px',
  })
}

binddatatotable(form: any) {
  this.dialogdata['service_code'] = this.serviceCODE
  this.dialogdata['service_description'] = this.serviceNAME
  console.log(this.dialogdata);
  this.formdatatotablearray.push(this.dialogdata)
  console.log(this.formdatatotablearray);
  this.dataSource.data = this.formdatatotablearray
  this.dialogdata = {}
  this.dialog.closeAll();
}
editservicedata(row1: any, index: any, data: any){
  console.log(row1)
  this.selectedIndex=this.formdatatotablearray.indexOf(row1)
  console.log(row1)
  this.dialog.open(data, {
    width: '1100px',
  })
  this.masterData.forEach((ele:any)=>{
    if(ele.code == row1.service_code){
      this.systemref =  ele.system_reference_1
    }
  })
  this.editeddialogdata.servicecode = this.systemref
  this.editeddialogdata.uom = row1.uom || row1.unit_of_measurement
  this.editeddialogdata.unitprice = row1.unitprice || row1.unit_price
  this.editeddialogdata.taxdescription = row1.taxdescription ||row1.tax_description
  this.editeddialogdata.TaxPercent = row1.TaxPercent || row1.tax_percentage
  this.editeddialogdata.quantity = row1.quantity 
  
}
// closeeditdialogdata(){
//   this.dialog.closeAll();
// }
editbindedDatatotable(){
  this.editeddialogdata['service_code'] = this.serviceCODE
  this.editeddialogdata['service_description'] = this.serviceNAME
  this.formdatatotablearray.splice(this.selectedIndex, 1, this.editeddialogdata);
  this.dataSource.data = this.formdatatotablearray
  console.log(this.dataSource.data);
  this.editeddialogdata = {}
  this.dialog.closeAll();
}

deleterowData(index:any){
  console.log(index)
  this.formdatatotablearray.splice(index, 1);
  this.dataSource.data=this.formdatatotablearray
  //this.finaldataarray=[]
  // console.log(this.dataSource.data)
  //this.dataSource.data = new MatTableDataSource(this.count);

}

deleteservicedata(rw: any, data: any) {
  this.dialog.open(data, {
    width: '400px',
    // scrollStrategy: new NoopScrollStrategy()
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
  this.custservice.deletesiterecommendationsheet(obj).subscribe((res: any) => {
    console.log(obj);
    if (res && res['status_code'] == "200") {
      this.alertcall.showSuccess('Accepted', res['message']);
      this.dialog.closeAll()
      this.deletemodel.reason=""
      this.getData()
      this.getlogdata()
    } else {
      this.alertcall.showWarning('Error', res['message']);
    }
  })

}
savefinaldata(fr: any){
  if(this.btn==="Save"){
  console.log(this.formdatatotablearray);
  
  this.formdatatotablearray.forEach((val:any, index)=>{
    this.SNO.push(index + 1);
    this.matCode.push(val.service_code)
    this.matName.push(val.service_description)
    this.UOM.push(val.uom)
    this.UnitPrice.push(val.unitprice)
    this.Quantity.push(Number(val.quantity))
    this.TaxDescription.push(val.taxdescription)
    this.TaxPercentage.push(val.TaxPercent)

  }) 
  let obj={
    "command":"add",
    "company_name":this.formdata.companyname,
    "description_of_work":this.formdata.description,
    "contractor_name":this.formdata.contractorname,
    "work_order_number":this.formdata.wonumber,
    "work_order_date":this.formdata.wodate,
    "work_order_value":Number(this.formdata.wovalue),
    "debit_value_royalty": Number(this.formdata.debitvalue),
    "diesel_recovery": Number(this.formdata.dieselrecovery),
    
    "invoice_number": Number(this.formdata.invnumber),
    
    "ra_bill_from_date":this.formdata.rafromdate,
    "ra_bill_to_date":this.formdata.ratodate,
    "service_description":this.matCode,
    "service_code":this.matName,
    "unit_of_measurement":this.UOM,
    "quantity":this.Quantity,
    "unit_price":this.UnitPrice,
    
    "tds_description":this.formdata.tdsdesc,
    "tds_percentage":Number(this.formdata.tdspercentage),
    
    "labour_description":this.formdata.labourdesc,
    "labour_percentage":Number(this.formdata.labourpercentage),
    
    "tax_description":this.TaxDescription,
    "tax_percentage":this.TaxPercentage
   
  }
  this.custservice.addsiterecommendationsheet(obj).subscribe((res: any) => {
    if (res && res['status_code'] == "200") {
      Swal.fire({
        text: res['message'],
        title: res['ref'],
         icon: 'success',
         width: 500,
        });
      fr.reset();
      this.formdatatotablearray=[]
      this.dataSource.data = []
      this.SNO=[]
    this.matCode=[]
    this.matName=[]
    this.UOM=[]
    this.UnitPrice=[]
    this.Quantity=[]
    this.TaxDescription=[]
    this.TaxPercentage=[]
    this.getData();
    this.getlogdata()
    this.initialdata=true;
    this.secondarydata=false;
   this.resultsrsnumber=res['reference']
   if(this.fileUploadUrlssrs.length > 0){
    this.uploadingselectedfiles()
   }
    } else {
      this.alertcall.showWarning('Accepted', res['message']);
      this.SNO=[]
      this.matCode=[]
      this.matName=[]
      this.UOM=[]
      this.UnitPrice=[]
      this.Quantity=[]
      this.TaxDescription=[]
      this.TaxPercentage=[]
    }
 
  })
  }else{
    console.log(this.formdatatotablearray);
  
  this.formdatatotablearray.forEach((val:any, index)=>{
    this.SNO.push(index + 1);
    this.matCode.push(val.service_code)
    this.matName.push(val.service_description)
    this.UOM.push(val.uom || val.unit_of_measurement)
    this.UnitPrice.push(val.unitprice|| val.unit_price)
    this.Quantity.push(Number(val.quantity))
    this.TaxDescription.push(val.taxdescription || val.tax_description)
    this.TaxPercentage.push(val.TaxPercent|| val.tax_percentage)

  }) 
  let obj={
    "reason":this.editModel.reason,
    "command":"edt",
    "number":this.editednumber,
    "company_name":this.formdata.companyname,
    "description_of_work":this.formdata.description,
    "contractor_name":this.formdata.contractorname,
    "work_order_number":this.formdata.wonumber,
    "work_order_date":this.formdata.wodate,
    "work_order_value":Number(this.formdata.wovalue),
    "debit_value_royalty": Number(this.formdata.debitvalue),
    "diesel_recovery": Number(this.formdata.dieselrecovery),
    
    "invoice_number": Number(this.formdata.invnumber),
    
    "ra_bill_from_date":this.formdata.rafromdate,
    "ra_bill_to_date":this.formdata.ratodate,
    "service_description":this.matName,
    "service_code":this.matCode,
    "unit_of_measurement":this.UOM,
    "quantity":this.Quantity,
    "unit_price":this.UnitPrice,
    
    "tds_description":this.formdata.tdsdesc,
    "tds_percentage":Number(this.formdata.tdspercentage),
    
    "labour_description":this.formdata.labourdesc,
    "labour_percentage":Number(this.formdata.labourpercentage),
    
    "tax_description":this.TaxDescription,
    "tax_percentage":this.TaxPercentage
   
  }
  this.custservice.addsiterecommendationsheet(obj).subscribe((res: any) => {
    if (res && res['status_code'] == "200") {
      Swal.fire({
        text: res['message'],
        title: res['ref'],
         icon: 'success',
         width: 500,
        });
      fr.reset();
      this.formdatatotablearray=[]
      this.dataSource.data = []
      this.SNO=[]
    this.matCode=[]
    this.matName=[]
    this.UOM=[]
    this.UnitPrice=[]
    this.Quantity=[]
    this.TaxDescription=[]
    this.TaxPercentage=[]
    this.getData();
    this.getlogdata()
    this.initialdata=true;
    this.secondarydata=false;
   this.resultsrsnumber=this.editednumber
   if(this.fileUploadUrlssrs.length > 0){
    this.uploadingselectedfiles()
   }
   this.btn="Save"
    } else {
      this.alertcall.showWarning('Accepted', res['message']);
      this.SNO=[]
      this.matCode=[]
      this.matName=[]
      this.UOM=[]
      this.UnitPrice=[]
      this.Quantity=[]
      this.TaxDescription=[]
      this.TaxPercentage=[]
    }
 
  }) 
  }
}

printsiterecom(data:any){
  console.log(data.number);
  
  this.router.navigate(['/qsd/printsitesheet'],{ queryParams: {'srsnumber': data.number}})
}
validateNumber(e: any) {
  const reg = /^-?\d*(\.\d{0,2})?$/;
 let input = e.target.value + String.fromCharCode(e.charCode);

 if (!reg.test(input)) {
     e.preventDefault();
 }
}
editsmsdata(data:any,dialog:any){
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
  this.custservice.addSiteRecommendedSheetData(obj).subscribe((res:any)=>{
    this.dialog.closeAll()
   this.editdataa=res.message[0]
   this.formdatatotablearray=res.message
   this.dataSource.data=this.formdatatotablearray
   this.formdata.companyname=this.editdataa.company_name,
   this.formdata.description=this.editdataa.description_of_work,
   this.formdata.contractorname=this.editdataa.contractor_name,
   this.formdata.wonumber=this.editdataa.work_order_number,
   this.formdata.wodate=moment(this.editdataa.work_order_date).format("YYYY-MM-DD"),
   this.formdata.wovalue=this.editdataa.work_order_value,
   this.formdata.debitvalue=this.editdataa.debit_value_royalty,
   this.formdata.dieselrecovery=this.editdataa.diesel_recovery,
   this.formdata.invnumber=this.editdataa.invoice_number,
  this.formdata.rafromdate=moment(this.editdataa.ra_bill_from_date).format("YYYY-MM-DD"),
  this.formdata.ratodate=moment(this.editdataa.ra_bill_to_date).format("YYYY-MM-DD"),
  this.formdata.tdsdesc=this.editdataa.tds_description,
  this.formdata.tdspercentage=this.editdataa.tds_percentage,
  this.formdata.labourdesc=this.editdataa.labour_cess_description,
  this.formdata.labourpercentage=this.editdataa.labour_cess_percentage,
    this.demo1TabIndex=0;
    this.initialdata=false;
    this.secondarydata=true;
    this.btn="Update"
  })
}
}
