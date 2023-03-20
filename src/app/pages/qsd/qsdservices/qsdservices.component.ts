import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertCallsService } from 'src/app/auth/alert-calls.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-qsdservices',
  templateUrl: './qsdservices.component.html',
  styleUrls: ['./qsdservices.component.scss']
})
export class QsdservicesComponent implements OnInit {
  dataSource = new MatTableDataSource();
  dataSource1=new MatTableDataSource()
  dataSourcemain = new MatTableDataSource();
  displayedColumns: any[] = [
    'sno',
    'service_code',
    'service_description',
    'unit_of_measurement',
    'quantity',
    'unit_price',
    'basic_price',
    'tax_description',
    'tax_percent',
    'tax_value',
    'tds_percentage',
    'tds_value',
    'labour_cess_percentage',
    'labour_cess_value',
    'debit_value_royalty',
    'diesel_recovery',
    'total_price',
    ];
    displayedColumns1: any[] = [
      'sno',
      'number',
      'date',
      'company_name',
      'contractor_name',
      'work_order_number',
      'ra_bill_number',
      'action'
        
      ];
model1:any={}
model:any={}
model2:any={}
grnnumber1:any;
wonumber:any;
  dmrDATA: any;
  materialRECEIPTDATA: any;
  materialcode: any;
  MATDATA: any[]=[]
  qcqty: any=0
  recqty: any=0
  accqty: any=0
  materialCODE:any[]=[]
  matDESCRIPTION:any[]=[]
  QCQTY:any[]=[]
  AcceptedQTY:any[]=[]
  RejectedQTY:any[]=[]
  remarks: any;
  REMARKS:any[]=[]
  qcQuantity: any;
  itemremarks: any;
  pageIndex: any=1;
  pageSize:any=10;
  reaData: boolean;
  totalRecords:any=0
  loadingRecords:any=false;
  deletedItem: any;
  finalarray:any[]=[]
  selectedIndex:any=-1
  QC_QTY:any[]=[]
  ACC_QTY:any[]=[]
  REJ_QTY:any[]=[]
  ITEMREMARKS:any[]=[]
  selecteddmr1: any;
  goodsreceptdata: any;
  selectedgrn1: any;
  checklists:any=[{name:"Yes" ,id:"true"},{name:"No",id:"false"}]
  selectedgrn2: any;
  selectedgrnvalue: any;
  selectedmaterial1: any;
  masterData: any;
  selectedstorage: any;
  storageData: any;
  woDATA: any;
  selectedwovalue: any;
  qsdverificationdata: any;
  QSDDATA: any;
serviceCode:any[]=[]
serviceDescription:any[]=[]
UOM:any[]=[]
Quantity:any[]=[]
unitPrice:any[]=[]
basicPRICE:any[]=[]
totalPrice:any[]=[]
debitvalueRoyality:any[]=[]
deiselRecovery:any[]=[]
tdsAmount:any[]=[]
tdsPercentage:any[]=[]
labourCessamt:any[]=[]
labourCessPercent:any[]=[]
taxDescription:any[]=[]
 taxPercentage:any[]=[]
 taxValue:any[]=[]
 
  deleteItemgrnnumber: any;
  fileUploadUrls: any[]=[]
  createNewFile: any = {};
  rabillnumdata: any;
  rabillno: any;
  tabledata: any;
  qsdservicenumber: any;
  filedata: any;
  deleteid: any;
  imageUrl=environment.base_url
  dialogRef:any=null;
  filenamearray:any[]=[]
  filenamearray1:any[]=[]
  selectedfiles:any[]=[]
  fileUploadUrlsqsd:any[]=[]
  resultqsdnumber: any;
  demo1TabIndex:any="Save"
  editednumber: any;
  EDITdata: any;
  initialdata:any=false;
  logdata: any;
  deletemodel:any={}
  constructor(public custservice:CustomerService,private dialog:MatDialog,
    private alertcall:AlertCallsService,private injector:Injector,private router:Router,
    private route:ActivatedRoute) { 
      this.dialogRef = this.injector.get(MatDialogRef, null)
    }

  ngOnInit(): void {
    this.model1.wodate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.rabilldate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.startdate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.completiondate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.invoicedate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.amendment_date=moment(new Date()).format("YYYY-MM-DD")
    this.model1.sitedocrecdate=moment(new Date()).format("YYYY-MM-DD")
    this.model1.hodocrecdate=moment(new Date()).format("YYYY-MM-DD")

    this.getMaterialdata()
    this.getdata()
    this.getgoodslist()
    this.getmasterdata()
    this.getstoragelocData()
    this.getwodataData()
    // this.getSAMPLEDATA()
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
      key:"QsdServices"
    }
    this.custservice.getActivityLog(obj).subscribe((res:any)=>{
      if(res.log.length > 0){
      this.logdata=res.log
      }
    })
  }
  openfileuploadmodel(data:any,row1:any){
    this.dialog.open(data,{
      width:'800px'
    })
    this.qsdservicenumber=row1.number
    this.getexistingfiles()
  }
  getexistingfiles(){
    let params = new HttpParams();
    params = new HttpParams()
     .set("document_number", this.qsdservicenumber,)
     .set( "document_type","Qsd Services")
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
    .set("document_number", this.qsdservicenumber,)
     .set( "document_type","Qsd Services")
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
    postData.append("document_type","Qsd Services");
    postData.append("document_number",this.qsdservicenumber);
    for (const file of this.fileUploadUrls) {
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
  uploadqsdfiles(fileInput: any) {
    if (
      fileInput &&
      fileInput.target &&
      fileInput.target.files &&
      fileInput.target.files.length > 0
    ) {
      this.fileUploadUrlsqsd = fileInput.target.files;
      for (const file of this.fileUploadUrlsqsd) {
        this.filenamearray1.push(file.name)
        this.selectedfiles.push(file)
      }
    }
  //  this.uploadingselectedfiles()
  }
  uploadingselectedfiles(){
    const postData = new FormData();
    postData.append("document_type","Qsd Services");
    postData.append("document_number",this.resultqsdnumber);
    for (const file of this.selectedfiles) {
      postData.append('doc', file);
    }
    // postData.append("doc",this.fileUploadUrlspo)
    
    this.custservice.addfileupload(postData).subscribe((res:any)=>{
if(res&&res['status_code']=='200'){
// this.alertcall.showSuccess("Accepted",res['message'])
this.fileUploadUrlsqsd=[]
this.selectedfiles=[]
this.filenamearray1=[]
}else{
  // this.alertcall.showWarning("Error",res['message'])
}
    })
  }
  getSAMPLEDATA(){
    let obj={
      "command":"test"
    }
    this.custservice.getsampledata(obj).subscribe((res:any)=>{
      console.log(res);
      this.tabledata=res.message
    })
  }
  opengrnmodel(data:any){
    this.dialog.open(data,{
      width:"600px"
    })
  }
  setdata(){
    let obj={
      "work_order_number":this.wonumber,
      "ra_bill_number":this.rabillno,
      "command":"set"
    }
    this.custservice.setqsdservices(obj).subscribe((res:any)=>{
    // if(res&&res['status_code']=="200"){
      this.dialog.closeAll()
      this.wonumber=''
      this.rabillno=''
      this.dataSource.data=res.table
      this.QSDDATA=res.table
      this.qsdverificationdata=res.data
      this.model1.workordernumber=this.qsdverificationdata.work_order_number
      this.model1.workordervalue=this.qsdverificationdata.work_order_value
      this.model1.contractorname=this.qsdverificationdata.contractor_name
      // this.model1.podate=moment(this.qsdverificationdata.purchase_order_date).format("YYYY-MM-DD")
      this.model1.description=this.qsdverificationdata.description_of_work
      this.model1.rabillnumber=this.qsdverificationdata.ra_bill_number
      this.model1.rabilldate=moment(this.qsdverificationdata.ra_bill_date).format("YYYY-MM-DD")
      
      this.model1.companyname=this.qsdverificationdata.company_name
      this.model1.abstractvalue=this.qsdverificationdata.abstract_value
      this.model1.wodate=moment(this.qsdverificationdata.work_order_date).format("YYYY-MM-DD")
      // this.model1.invoicenumber=res.data.invoice_number
      // this.model1.gateentrynumber=this.qsdverificationdata.gate_entry_number
      // this.model1.deliverychallannumber=this.qsdverificationdata.delivery_challan
      // this.model1.othertaxdesc=this.qsdverificationdata.other_tax_description
      // this.model1.amendment_number=this.qsdverificationdata.amendment_number
      // this.model1.amendment_value=this.qsdverificationdata.amendment_value
      // this.model1.amendment_date=moment(this.qsdverificationdata.amendment_date).format("YYYY-MM-DD")

      // this.model1.deliverychallan=this.qsdverificationdata.is_delivery_challan
      // this.model1.gateentry=this.qsdverificationdata.is_gate_entry
      // this.model1.isinvoice=this.qsdverificationdata.is_invoice
      // this.model1.ismrn=this.qsdverificationdata.is_mrn
     
      this.model1.vendoepannumber=this.qsdverificationdata.pan_number
     this.model1.vendorgst=this.qsdverificationdata.gst_number
  
      
    // }else{
    //   this.alertcall.showWarning("Error",res['message'])
    // }
      
    })
  }
  addQSD(data:any){
    this.dialog.open(data, {
      width: '1100px',
    })
  }
  binddatatotable(fr:any){
    console.log(this.model);
    
    this.MATDATA.push(this.model)
    this.dataSource.data =  this.MATDATA
    console.log(this.dataSource.data)
    this.model = {}
    this.dialog.closeAll();
  }
  goodsreceptdatAA(ev:any){
    console.log(ev.target.value);
    this.selectedgrn1=ev.target.value
    if(this.selectedgrn1.length>2){
this.getgoodslist()
    }
  }
  goodsreceptdatAA1(ev:any){
    console.log(ev.target.value);
    this.selectedgrn2=ev.target.value
    if(this.selectedgrn2.length>2){
this.getgoodslist()
    }
  }
  getgoodslist(){
    let obj={
      "command" : "lst",
       "pid" : 1, 
       "lmt" : 100000,
       "key": this.selectedgrn1 || this.selectedgrn2
    }
    this.custservice.getgoodsreceiptlist(obj).subscribe((res:any)=>{
    
      this.goodsreceptdata=res.data
      // this.dataSourcemain.data=res.data
      // this.totalRecords=res.count
    })
  }
  onpageevent(event:any){
    this.pageIndex=event.pageIndex+1;
    this.pageSize= event.pageSize;
    this.getdata()
  }
  getdata(){
    let obj={
      "command" : "lst",
       "pid" :  this.pageIndex,
       "lmt" : this.pageSize,
    }
    this.custservice.getqsdservices(obj).subscribe((res:any)=>{
      console.log(res.data);
      this.reaData=false;
      this.totalRecords = res?.count;
      this.dataSourcemain.data = res.data
      if(res.data.length==0){
       this.reaData = true
     }
    })
  }
  deleteItem(data:any,rw:any){
    this.deletedItem=data.number,
    this.deleteItemgrnnumber=data.grn_number
    this.dialog.open(rw,{
      width:'400px'
    })
  }
  deleteFile(){
    let obj={
      "command" : "del", 
      // "purchase_order_number" : this.deletedItem,
      "number":this.deletedItem,
      "reason": this.deletemodel.reason
    }
    this.custservice.addqsdservices(obj).subscribe((res:any)=>{
      if(res&&res['status_code']=="200"){
        this.alertcall.showSuccess('Accepted', res['message']);
       
        this.dialog.closeAll()
        this.deletemodel.reason=""
        this.getdata()
        this.getlogdata()
           }else{
            this.alertcall.showWarning('Accepted', res['message']);
           }
    })
      }
  getMaterialdata(){
    let obj={
      "command":"dmr",
      "lmt" : 100000,
      "pid" : 1,
      "key" : this.selecteddmr1
    }
    this.custservice.getQualityCheckdmrdata(obj).subscribe((res:any)=>{
     this.dmrDATA=res.data
      
    })
  }
  selectedgrn(){
// this.setdata()
  }
  selectedGRN1(){
    console.log(this.grnnumber1);
    
this.selectedgrnvalue=this.grnnumber1
  }
  bindgrndatatotable(fr:any){
    this.setdata()
  }
  selecteddmr(){
    console.log(this.model1.dmrnumber);
    let obj={
      command: "mat",
       key: this.model1.dmrnumber,
        field: "number"
    }
    this.custservice.  getmaterialreceiptdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.MATDATA=res.data
      this.materialRECEIPTDATA=res.data[0]
      this.model1.ponumber=this.materialRECEIPTDATA.purchase_order_number
      this.model1.podate=moment(this.materialRECEIPTDATA.purchase_order_date).format("YYYY-MM-DD");
      this.model1.companyname=this.materialRECEIPTDATA.company_name
      this.model1.vendorname=this.materialRECEIPTDATA.vendor_name
      this.model1.invoicenumber=this.materialRECEIPTDATA.invoice_number
      this.materialcode=this.materialRECEIPTDATA.material_code
     
    })
  }
  selectedqcqty(ev:any){
    this.qcqty=ev.target.value

    
  }
  selectedaccqty(ev:any,data:any){
    console.log(data);
    this.accqty=ev.target.value
    if(this.accqty>((this.qcqty||data)-this.recqty)){
      console.log((this.qcqty||data)-this.recqty);
      
      this.alertcall.showWarning("Accepted","Accepted Qty Exceed The Limit")
    }
  //  this.qcQuantity=data
  }
  selectedrecqty(ev:any,data:any){
this.recqty=ev.target.value
if(this.recqty>((this.qcqty||data)-this.accqty)){
  this.alertcall.showWarning("Accepted","Rejected Qty Exceeds The Limit")
}

  }
  selectedremarks(ev:any,index:any){
    this.selectedIndex=index

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
  deleterowItem(index:any){
    this.QSDDATA.splice(index,1)
    this.dataSource.data=this.QSDDATA

    console.log(this.dataSource.data)
    
  }
  savefinaldata(fr:any){
    this.QSDDATA.forEach((ele:any) => {
      this.serviceCode.push(ele.service_code)
      this.serviceDescription.push(ele.service_description)
      this.UOM.push(ele.unit_of_measurment)
      this.Quantity.push(Number(ele.quantity)||0)
      this.unitPrice.push(Number(ele.unit_price)||0)
      this.basicPRICE.push(ele.basic_price||0)
      this.totalPrice.push(Number(ele.total_price)||0)
      this.debitvalueRoyality.push(Number(ele.debit_value_royalty)||0)
      this.deiselRecovery.push(Number(ele.diesel_recovery)||0)
      this.tdsAmount.push(Number(ele.tds_value)||0)
      this.tdsPercentage.push(ele.tds_percentage||0)
      this.labourCessamt.push(ele.labour_cess_value)
      this.labourCessPercent.push(ele.labour_cess_percentage||0)
      this.taxDescription.push(ele.tax_description||0)
      this.taxPercentage.push(ele.tax_percentage)
      this.taxValue.push(ele.tax_value)
     
    });
    let obj={
      "command":"add",
      "comments":this.model1.comments,
       "company_name" : this.model1.companyname,
       "description_of_work" : this.model1.description,
       "contractor_name" : this.model1.contractorname,
       "pan_number" : this.model1.vendoepannumber,
       "gst_number" : this.model1.vendorgst,
       "work_order_number" : this.model1.workordernumber,
       "work_order_date" : this.model1.wodate,
       "work_order_value" : Number(this.model1.workordervalue),
       "amendment_number" : this.model1.amendment_number,
       "amendment_date" : this.model1.amendment_date,
       "amendment_value" : Number(this.model1.amendment_value),
       "cummulative_order_value" :  this.model1.cummulative_order_value,
       "invoice_number" : this.model1.invoicenumber,
       "invoice_date" : this.model1.invoicedate,
       "ra_bill_number" : this.model1.rabillnumber,
       "ra_bill_date" : this.model1.rabilldate,
       "order_duration" : this.model1.orderduration,
       "start_date" : this.model1.startdate,
       "completion_date" : this.model1.completiondate,
       "previous_information_location" : this.model1.preinfolocation,
       "observations" : this.model1.observations,
       "abstract_value" : Number(this.model1.abstractvalue),
       "tds_amount" : this.tdsAmount, 
       "tds_percentage" : this.tdsPercentage, 
       "labour_cess_amount" : this.labourCessamt, 
       "labour_cess_percentage" : this.labourCessPercent, 
       "environment_cess_amount" : Number(this.model1.environment_cess_amount),
       "environment_cess_percentage" : Number(this.model1.envcesspercent),
       "mobilisation_recovery_amount" : Number(this.model1.mobilisation_recovery_percentage),
       "mobilisation_recovery_percentage" : Number(this.model1.mobilisation_recovery_amount),
       "machinery_recovery_amount" : Number(this.model1.machinery_recovery_amount),
       "machinery_recovery_percentage" : Number(this.model1.machinery_recovery_percentage),
       "retention_money" : Number(this.model1.retention_money),
       "retention_money_percentage" :Number(this.model1.retention_money_percentage),
       "bill_copy" : this.model1.bill_copy,
       "site_document_received_date" : this.model1.sitedocrecdate,
       "ho_document_received_date" : this.model1.hodocrecdate,
       "is_site_certification" : Boolean(this.model1.issitecerity),
       "is_invoice" : Boolean(this.model1.isinvoice),
       "is_bill_abstract" : Boolean(this.model1.isbillabstract),
       "is_jms_logsheets_reports" : Boolean(this.model1.jmslogistics),
       "is_amendments" : Boolean(this.model1.ambendments),
       'is_packing_list' : Boolean(this.model1.packinglist),
       "is_test_reports" : Boolean(this.model1.istestreports),
       "is_mrn" : Boolean(this.model1.ismrn),
       "is_freight" : Boolean(this.model1.isfreight),
       'is_reconcillation' : Boolean(this.model1.reconcillatiuon),
       'is_debit_note' : Boolean(this.model1.debitnote),
       "is_statutory_compliance" : Boolean(this.model1.statutorycompliance),
       "is_bank_details" : Boolean(this.model1.bankdetails),
       "is_work_completion_certificate" :Boolean(this.model1.workcompletion),
       "is_asbuilt_drgs_and_sketches" : Boolean(this.model1.asbuiltdrgs),
       "is_photographs" : Boolean(this.model1.isphotographs),
       "tax_description" : this.taxDescription, 
       "tax_percentage" : this.taxPercentage, 
       "tax_value" :this.taxValue, 
       "total_value" : Number(this.model1.totalvalue),
       "net_payable" :Number(this.model1.netpayable),
       "service_description" : this.serviceDescription,
       "service_code" : this.serviceCode, 
       "unit_of_measurement" : this.UOM, 
       "quantity" :this.Quantity, 
       "unit_price" : this.unitPrice, 
       "basic_price" : this.basicPRICE, 
       "total_price" : this.totalPrice, 
       "debit_value_royalty" : this.debitvalueRoyality, 
       "diesel_recovery" : this.deiselRecovery, 


       
  }
  this.custservice.addqsdservices(obj).subscribe((res:any)=>{
    console.log(res);
    if(res&&res['status_code']=='200'){
      // this.alertcall.showSuccess('Accepted', res['message']);
      Swal.fire({
        text: res['message'],
        title: res['ref'],
         icon: 'success',
        // title: res['reference'],
        width: 500,
        });
      this.QSDDATA=[]
      this.dataSource.data=[]
      fr.reset()
      this.serviceCode=[]
this.serviceDescription=[]
this.UOM=[]
this.Quantity=[]
this.unitPrice=[]
this.basicPRICE=[]
this.totalPrice=[]
this.debitvalueRoyality=[]
this.deiselRecovery=[]
this.tdsAmount=[]
this.tdsPercentage=[]
this.labourCessamt=[]
this.labourCessPercent=[]
this.taxDescription=[]
 this.taxPercentage=[]
 this.taxValue=[]

    this.getdata()
    this.getlogdata()
    this.resultqsdnumber=res['reference']
    if(this.fileUploadUrlsqsd.length > 0){
      this.uploadingselectedfiles()
    }
    
       }else{
        this.alertcall.showWarning('Accepted', res['message']);
        this.serviceCode=[]
        this.serviceDescription=[]
        this.UOM=[]
        this.Quantity=[]
        this.unitPrice=[]
        this.basicPRICE=[]
        this.totalPrice=[]
        this.debitvalueRoyality=[]
        this.deiselRecovery=[]
        this.tdsAmount=[]
        this.tdsPercentage=[]
        this.labourCessamt=[]
        this.labourCessPercent=[]
        this.taxDescription=[]
         this.taxPercentage=[]
         this.taxValue=[]
        
       } 
    
  })
  }
  getdmrDATA(ev:any){
    console.log(ev.target.value);
    this.selecteddmr1=ev.target.value
    if(this.selecteddmr1.length>2){
this.getMaterialdata()
    }
  }
  getmaterialDATA(ev:any){
    this.selectedmaterial1=ev.target.value
    if(this.selectedmaterial1.length>2){
this.getmasterdata()
    }
    if(! this.selectedmaterial1){
      this.getmasterdata()
    }
  }
  getmasterdata(){
    let obj={
      "command":'lst',
      "lmt":100000,
      "pid":1,
      "key":this.selectedmaterial1 ||''
    }
    this.custservice.getmaterialmasterdata(obj).subscribe((res:any)=>{
      console.log(res);
      this.masterData=res.data
      
    })
  }
  getstorageDATA(ev:any){
    console.log(ev.target.value);
    this.selectedstorage=ev.target.value
    if( this.selectedstorage.length>2){
this.getstoragelocData()
    }
  }
  getstoragelocData(){
    let obj={
      "command": "mat",
      "field": "storage_location",
      "key":this.selectedstorage ||''
    }
    this.custservice.getmatstoragelocdata(obj).subscribe((res:any)=>{
       this.storageData=res.data
        
      
      
    })
  }
  workorderdata(ev:any){
    this.selectedwovalue=ev.target.value
    if( this.selectedwovalue.length>2){
this.getwodataData()
    }
    if(!this.selectedwovalue){
      this.getwodataData()
    }
  }
  getwodataData() {
    let obj = {
      command: "wol",
      // lmt: 100000,
      // pid: 1,
      key: this.selectedwovalue ||"",
    };
    this.custservice.addqsdserviceswonumber(obj).subscribe((res: any) => {
     this.woDATA=res.data
    });
  }
  selectedwonumber(){
    let obj={
      command:"rbl",
      "work_order_number":this.wonumber
    }
    this.custservice.setqsdservices(obj).subscribe((res:any)=>{
    this.rabillnumdata=res.data
    //  this.grnnumber1=''
    })
    this.rabillno=null
  }
 
  getcummulativevalue(){
    this.model1.cummulative_order_value=this.model1.workordervalue+this.model1.amendment_value
  }
  keyPressNumbers(evt:any)
  {
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode != 46 && charCode > 31 
       && (charCode < 48 || charCode > 57))
        return false;

     return true;
  }
  editqsddata(data:any){
    this.editednumber=data.number
    
    let obj={
      "command": "mat",
      "number": this.editednumber,
      "work_order_number": data.work_order_number,
      "ra_bill_number": data.ra_bill_number
    }
    this.custservice.addqsdserviceswonumber(obj).subscribe((res:any)=>{
      console.log(res);
      this.demo1TabIndex=0;
      this.initialdata=true;
      // this.btn="Update"
      this.demo1TabIndex = 0
      this.EDITdata = res.data[0][0]
     this.QSDDATA = res.data[0]
      console.log(this.QSDDATA);
      this.dataSource.data = res.data[0]
      console.log(this.dataSource.data)
      this.model1.comments = this.EDITdata.comments
      this.model1.companyname = this.EDITdata.company_name
      this.model1.description = this.EDITdata.description_of_work
      this.model1.contractorname = this.EDITdata.contractor_name
      this.model1.vendoepannumber = this.EDITdata.pan_number
      this.model1.vendorgst = this.EDITdata.gst_number
      this.model1.workordernumber = this.EDITdata.work_order_number
      this.model1.wodate = moment(this.EDITdata.work_order_date).format('YYYY-MM-DD')
      this.model1.workordervalue = this.EDITdata.work_order_value
      this.model1.amendment_number = this.EDITdata.amendment_number
      this.model1.amendment_date = moment(this.EDITdata.amendment_date).format('YYYY-MM-DD')
      this.model1.amendment_value = this.EDITdata.amendment_value
      this.model1.cummulative_order_value = this.EDITdata.cummulative_order_value
      this.model1.invoicenumber = this.EDITdata.invoice_number
      this.model1.invoicedate = moment(this.EDITdata.invoice_date).format('YYYY-MM-DD')
      this.model1.rabillnumber = this.EDITdata.ra_bill_number
      this.model1.rabilldate = moment(this.EDITdata.ra_bill_date).format('YYYY-MM-DD')
      this.model1.orderduration = this.EDITdata.order_duration
      this.model1.startdate = moment(this.EDITdata.start_date).format('YYYY-MM-DD')
      this.model1.completiondate = moment(this.EDITdata.completion_date).format('YYYY-MM-DD')
      this.model1.preinfolocation = this.EDITdata.previous_information_location
      this.model1.observations = this.EDITdata.observations
      this.model1.abstractvalue = this.EDITdata.abstract_value
      this.model1.environment_cess_amount = this.EDITdata.environment_cess_amount
      this.model1.envcesspercent = this.EDITdata.environment_cess_percentage
      this.model1.mobilisation_recovery_percentage = this.EDITdata.mobilisation_recovery_amount
      this.model1.mobilisation_recovery_amount = this.EDITdata.mobilisation_recovery_percentage
      this.model1.machinery_recovery_amount = this.EDITdata.machinery_recovery_amount
      this.model1.machinery_recovery_percentage = this.EDITdata.machinery_recovery_percentage
      this.model1.retention_money = this.EDITdata.retention_money
      this.model1.retention_money_percentage = this.EDITdata.retention_money_percentage
      this.model1.bill_copy = this.EDITdata.bill_copy
      this.model1.sitedocrecdate = moment(this.EDITdata.site_document_received_date).format('YYYY-MM-DD')
      this.model1.hodocrecdate = moment(this.EDITdata.ho_document_received_date).format('YYYY-MM-DD')
      this.model1.issitecerity = this.EDITdata.is_site_certification
      this.model1.isinvoice = this.EDITdata.is_invoice
      this.model1.isbillabstract = this.EDITdata.is_bill_abstract
      this.model1.jmslogistics = this.EDITdata.is_jms_logsheets_reports
      this.model1.ambendments = this.EDITdata.is_amendments
      this.model1.packinglist = this.EDITdata.is_packing_list
      this.model1.istestreports = this.EDITdata.is_test_reports
      this.model1.ismrn = this.EDITdata.is_mrn
      this.model1.isfreight = this.EDITdata.is_freight
      this.model1.reconcillatiuon = this.EDITdata.is_reconcillation
      this.model1.debitnote = this.EDITdata.is_debit_note
      this.model1.statutorycompliance = this.EDITdata.is_statutory_compliance
      this.model1.bankdetails = this.EDITdata.is_bank_details
      this.model1.workcompletion = this.EDITdata.is_work_completion_certificate
      this.model1.asbuiltdrgs = this.EDITdata.is_asbuilt_drgs_and_sketches
      this.model1.isphotographs = this.EDITdata.is_photographs
      this.model1.totalvalue = this.EDITdata.total_value
      this.model1.netpayable = this.EDITdata.net_payable

    })
  }
  printqsdservices(data:any){
    console.log(data.number);
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "dmrnumber": data.number
    //   }
    // };
    this.router.navigate(['/qsd/printqsdservices'],{ queryParams: {'qsdservicenumber': data.number}})
    // this.dialog.open(PrintdmrComponent,{
    //   width:"500px",
    //   height:"auto",
    //   data:data.number
    // })
    
      }
}
